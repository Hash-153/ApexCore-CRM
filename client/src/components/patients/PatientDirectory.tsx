import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { PatientRecord } from '../../types/index';
import { Search, Plus, User, FileCode, Shield, Phone, Mail, MapPin, Eye } from 'lucide-react';
import type { NavTab } from '../layout/Sidebar';

interface PatientDirectoryProps {
  onSelectPatient: (patient: PatientRecord) => void;
  onNavigate: (tab: NavTab) => void;
}

export const PatientDirectory: React.FC<PatientDirectoryProps> = ({ onSelectPatient, onNavigate }) => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [fhirModalData, setFhirModalData] = useState<any | null>(null);

  // New Patient Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'FEMALE' as 'MALE' | 'FEMALE' | 'OTHER',
    bloodType: 'O+' as any,
    phone: '',
    email: '',
    street: '',
    city: '',
    state: 'MA',
    zip: '',
    emergencyName: '',
    emergencyRel: 'Spouse',
    emergencyPhone: '',
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: '',
  });

  useEffect(() => {
    loadPatients();
  }, [searchQuery]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await api.getPatients(searchQuery);
      setPatients(data);
    } catch (err) {
      console.error('Failed to load patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.createPatient({
        fullName: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        bloodType: formData.bloodType,
        phone: formData.phone,
        email: formData.email,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        emergencyContact: {
          name: formData.emergencyName,
          relationship: formData.emergencyRel,
          phone: formData.emergencyPhone,
        },
        insurance: {
          providerName: formData.insuranceProvider,
          policyNumber: formData.policyNumber || `POL-${Math.floor(1000000 + Math.random() * 9000000)}`,
          groupNumber: 'GRP-1001',
          subscriberName: formData.fullName,
          copayAmountUsd: 25.0,
          deductibleRemainingUsd: 250.0,
          coinsurancePercent: 20,
        },
      });

      setShowNewModal(false);
      loadPatients();
      onSelectPatient(created);
      onNavigate('EHR_CHART');
    } catch (err: any) {
      alert(`Error creating patient: ${err.message}`);
    }
  };

  const handleExportFhir = async (patientId: string) => {
    try {
      const fhir = await api.exportFhirPatient(patientId);
      setFhirModalData({ title: 'HL7 FHIR R4 Patient Resource JSON', data: fhir });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleExportDeidentified = async (patientId: string) => {
    try {
      const deidentified = await api.exportDeidentifiedPatient(patientId);
      setFhirModalData({ title: 'HIPAA Safe Harbor De-identified Payload (18 Elements Scrubbed)', data: deidentified });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Patient Directory & Master Index (MPI)</h1>
          <p className="text-xs text-slate-400">Search and manage longitudinal medical records and demographics.</p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-sky-600/30 transition self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by patient name, MRN, phone number, or email address..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Patient Name & MRN</th>
                <th className="py-3.5 px-4">Demographics</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Insurance Carrier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions & Interop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-800/40 transition group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 text-sky-400 font-bold flex items-center justify-center text-xs group-hover:bg-sky-600 group-hover:text-white transition">
                        {patient.fullName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            onSelectPatient(patient);
                            onNavigate('EHR_CHART');
                          }}
                          className="font-semibold text-white group-hover:text-sky-300 transition text-left"
                        >
                          {patient.fullName}
                        </button>
                        <div className="font-mono text-[11px] text-sky-400">{patient.mrn}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <span>DOB: {patient.dob}</span>
                      <span className="text-slate-500"> ({patient.gender})</span>
                    </div>
                    <span className="text-[11px] text-rose-400 font-bold">Blood: {patient.bloodType}</span>
                  </td>

                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone className="h-3 w-3" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="h-3 w-3" />
                      <span>{patient.email}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 font-medium">{patient.insurance.providerName}</span>
                    <span className="block text-[11px] font-mono text-slate-400">
                      Pol: {patient.insurance.policyNumber}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        patient.status === 'ADMITTED'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          onSelectPatient(patient);
                          onNavigate('EHR_CHART');
                        }}
                        className="px-2.5 py-1 bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white rounded-lg text-xs font-medium border border-sky-600/40 transition flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Chart</span>
                      </button>

                      {/* FHIR R4 Export */}
                      <button
                        onClick={() => handleExportFhir(patient.id)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-xs border border-slate-700 transition"
                        title="Export as HL7 FHIR R4 Patient JSON"
                      >
                        <FileCode className="h-3.5 w-3.5" />
                      </button>

                      {/* HIPAA De-identification Export */}
                      <button
                        onClick={() => handleExportDeidentified(patient.id)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs border border-slate-700 transition"
                        title="Export under HIPAA Safe Harbor De-identification"
                      >
                        <Shield className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Viewer Modal for FHIR and De-identification */}
      {fhirModalData && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="h-5 w-5 text-sky-400" />
                <span>{fhirModalData.title}</span>
              </h3>
              <button
                onClick={() => setFhirModalData(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-y-auto max-h-96 border border-slate-800">
              {JSON.stringify(fhirModalData.data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Register Patient Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-sky-400" />
                <span>Register New Patient</span>
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Date of Birth (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Blood Type</label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-lg shadow-sky-600/30 transition text-xs"
              >
                Create Record & Generate MRN
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
