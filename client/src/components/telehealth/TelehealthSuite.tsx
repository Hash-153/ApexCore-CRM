import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { TelehealthSessionRecord, PatientRecord } from '../../types/index';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, FileText, User, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TelehealthSuiteProps {
  activePatient: PatientRecord | null;
}

export const TelehealthSuite: React.FC<TelehealthSuiteProps> = ({ activePatient }) => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<TelehealthSessionRecord[]>([]);
  const [activeSession, setActiveSession] = useState<TelehealthSessionRecord | null>(null);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(activePatient?.id || 'PAT-001');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [consultNotes, setConsultNotes] = useState('');
  const [followUpPlan, setFollowUpPlan] = useState('Continue current medications. Schedule follow-up telehealth visit in 3 months.');
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sessList, patList] = await Promise.all([api.getTelehealthSessions(), api.getPatients()]);
      setSessions(sessList);
      setPatients(patList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartCall = async (sess: TelehealthSessionRecord) => {
    try {
      const updated = await api.startTelehealthCall(sess.id);
      setActiveSession(updated);
      setBanner(`Connected to Virtual Telehealth Room: ${updated.sessionRoomCode}`);
      setTimeout(() => setBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCompleteCall = async () => {
    if (!activeSession) return;
    try {
      await api.completeTelehealthCall(activeSession.id, consultNotes, followUpPlan);
      setActiveSession(null);
      setBanner('Telehealth consultation completed and clinical encounter notes archived.');
      setTimeout(() => setBanner(null), 5000);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Video className="h-5 w-5 text-sky-400" />
            <span>Telehealth Virtual Care & Consultation Suite</span>
          </h1>
          <p className="text-xs text-slate-400">
            End-to-end encrypted virtual clinical consultations, real-time in-call charting, and EHR sync.
          </p>
        </div>
      </div>

      {banner && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{banner}</span>
        </div>
      )}

      {/* Active Call HUD or Session List */}
      {activeSession ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Screen */}
          <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 flex flex-col justify-between min-h-[460px]">
            {/* Call Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-white">LIVE CONSULTATION</span>
                <span className="text-xs text-slate-400 font-mono">({activeSession.sessionRoomCode})</span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Patient: {activeSession.patientName}
              </span>
            </div>

            {/* Video Placeholder Box */}
            <div className="relative flex-1 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="h-20 w-20 rounded-full bg-slate-800 border-2 border-sky-500/50 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-2xl">
                  {activeSession.patientName.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="text-white font-bold text-base">{activeSession.patientName}</h3>
                <span className="text-xs text-emerald-400 font-medium">Encrypted WebRTC Peer Connection Active</span>
              </div>

              {/* Physician Picture-in-Picture */}
              <div className="absolute bottom-4 right-4 h-28 w-40 bg-slate-950 rounded-xl border-2 border-slate-700 p-2 flex flex-col justify-between shadow-2xl">
                <span className="text-[10px] text-slate-400 font-bold truncate">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-400 text-right">HD Camera ON</span>
              </div>
            </div>

            {/* Video Call Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition ${isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-full transition ${isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </button>
              <button
                onClick={handleCompleteCall}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full shadow-lg shadow-rose-600/30 transition flex items-center gap-2 text-xs"
              >
                <PhoneOff className="h-4 w-4" />
                <span>End Consultation & Save Note</span>
              </button>
            </div>
          </div>

          {/* In-Call Clinical Notepad */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-sky-400" />
              <span>In-Call Clinical Documentation</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Consultation Findings & Synthesis</label>
                <textarea
                  rows={6}
                  value={consultNotes}
                  onChange={(e) => setConsultNotes(e.target.value)}
                  placeholder="Patient presented virtually via telehealth for follow-up. Blood pressure logs reviewed..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Follow-Up & Treatment Plan</label>
                <textarea
                  rows={3}
                  value={followUpPlan}
                  onChange={(e) => setFollowUpPlan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Sessions Directory */
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="font-bold text-white text-sm">Scheduled Virtual Appointments</h2>

          <div className="space-y-3">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white text-sm">{sess.patientName}</h3>
                    <span className="text-xs font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                      {sess.sessionRoomCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sess.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : sess.status === 'IN_CALL'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                          : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {sess.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Scheduled: {sess.scheduledTime.replace('T', ' ').slice(0, 16)} | Attending: {sess.physicianName} ({sess.durationMinutes} mins)
                  </p>
                  {sess.consultationSummary && (
                    <p className="text-xs text-slate-300 italic pt-1">{sess.consultationSummary}</p>
                  )}
                </div>

                {sess.status !== 'COMPLETED' && (
                  <button
                    onClick={() => handleStartCall(sess)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-600/30 transition flex items-center gap-1.5 self-start md:self-auto"
                  >
                    <Video className="h-4 w-4" />
                    <span>Launch Virtual Room</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
