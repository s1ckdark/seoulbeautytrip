import * as admin from "firebase-admin";
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import serviceAccountJson from '@/serviceAccount.json'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = serviceAccountJson as admin.ServiceAccount;

const firebaseAdminConfig = {
    credential: cert(serviceAccount)
}

export function customInitApp() {
    if (getApps().length <= 0) {
        try {
            initializeApp(firebaseAdminConfig);
        } catch (error: any) {
            console.log('Firebase admin initialization error', error.stack);
        }
    }
}

export const firebaseAuth = getAuth();