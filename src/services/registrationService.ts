import { EVENT_CONFIG } from '../config/eventConfig';

export interface RegistrationDraftPayload {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  cityCountry: string;
  participantCategory: string;
  workshopTrack: string;
  notes?: string;
}

export interface RegistrationSubmitResult {
  submitted: boolean;
  mode: 'backend' | 'preview-disabled';
  message: string;
}

/**
 * Centralized registration service prepared for future Supabase, Firebase,
 * or custom REST API integration. Live submission stays disabled until
 * environment variables are configured and verified.
 */
export async function submitParticipantRegistration(
  payload: RegistrationDraftPayload
): Promise<RegistrationSubmitResult> {
  if (!EVENT_CONFIG.registration.isBackendConfigured) {
    return {
      submitted: false,
      mode: 'preview-disabled',
      message:
        'Registration Information Coming Soon. No backend endpoint is active yet; your form preview was validated locally without transmitting personal data.',
    };
  }

  if (EVENT_CONFIG.registration.apiEndpoint) {
    const response = await fetch(EVENT_CONFIG.registration.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Registration service responded with status ${response.status}`);
    }

    return {
      submitted: true,
      mode: 'backend',
      message: 'Registration received successfully.',
    };
  }

  return {
    submitted: false,
    mode: 'preview-disabled',
    message: 'Registration Information Coming Soon.',
  };
}
