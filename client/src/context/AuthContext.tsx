import React, { createContext, useContext, useState } from 'react';
import type { UserRole, UserPrincipal } from '../types/index';
import { setApiRole } from '../services/api';

export const ROLE_PROFILES: Record<UserRole, UserPrincipal> = {
  PHYSICIAN: {
    id: 'DOC-101',
    name: 'Dr. Sarah Mitchell, MD',
    email: 'dr.mitchell@medicore.health',
    role: 'PHYSICIAN',
    department: 'Internal Medicine & Cardiology',
    npiNumber: '1942857291',
  },
  TRIAGE_NURSE: {
    id: 'NURSE-202',
    name: 'Robert Vance, BSN, RN',
    email: 'r.vance@medicore.health',
    role: 'TRIAGE_NURSE',
    department: 'Emergency & Urgent Triage',
  },
  PHARMACIST: {
    id: 'PHARM-303',
    name: 'Elena Rostova, PharmD, BCPS',
    email: 'e.rostova@medicore.health',
    role: 'PHARMACIST',
    department: 'Clinical Pharmacy Services',
  },
  LAB_TECHNICIAN: {
    id: 'LAB-404',
    name: 'David Chen, MLS (ASCP)',
    email: 'd.chen@medicore.health',
    role: 'LAB_TECHNICIAN',
    department: 'Diagnostic Pathology & Hematology',
  },
  RADIOLOGIST: {
    id: 'RAD-505',
    name: 'Dr. Marcus Holloway, MD, FACR',
    email: 'm.holloway@medicore.health',
    role: 'RADIOLOGIST',
    department: 'Diagnostic Radiology & Imaging',
    npiNumber: '1839201948',
  },
  BILLING_SPECIALIST: {
    id: 'BILL-606',
    name: 'Karen Jenkins, CPB',
    email: 'k.jenkins@medicore.health',
    role: 'BILLING_SPECIALIST',
    department: 'Revenue Cycle & Claims Management',
  },
  SYSTEM_ADMIN: {
    id: 'ADMIN-001',
    name: 'Alexander Cross, CISSP',
    email: 'admin@medicore.health',
    role: 'SYSTEM_ADMIN',
    department: 'Health Informatics & Security',
  },
  PATIENT: {
    id: 'PAT-001-USER',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    role: 'PATIENT',
    patientId: 'PAT-001',
  },
};

interface AuthContextType {
  currentUser: UserPrincipal;
  switchRole: (role: UserRole) => void;
  accessReason: string;
  setAccessReason: (reason: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('PHYSICIAN');
  const [accessReason, setAccessReasonState] = useState<string>('Clinical Charting & Direct Patient Care');

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setApiRole(role, accessReason);
  };

  const setAccessReason = (reason: string) => {
    setAccessReasonState(reason);
    setApiRole(currentRole, reason);
  };

  const currentUser = ROLE_PROFILES[currentRole];

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, accessReason, setAccessReason }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
