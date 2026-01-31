// src/store/types.ts

// 1. User Profile Data
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	tag: string; // e.g., @alex
	phoneNumber: string;
	profileImage?: string;
	kycStatus: "pending" | "verified" | "rejected" | "none";
}

// 2. Wallet & Transaction Data
export interface Transaction {
	id: string;
	type: "credit" | "debit";
	amount: number;
	title: string;
	category: string;
	date: string;
	status: "successful" | "pending" | "failed";
}

// 3. The Auth State (What your store actually looks like)
export interface AuthState {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;
}
