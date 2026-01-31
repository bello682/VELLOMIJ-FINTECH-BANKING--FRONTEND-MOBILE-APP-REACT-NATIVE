// navigation/types.ts (Navigation): Handles the routing logic and which parameters are passed between screens.
export type RootStackParamList = {
	// --- Auth Flow ---
	Splash: undefined;
	Onboarding: undefined;
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
	OTPVerification: { email?: string; phone?: string }; // Recommended to pass the target
	ForgotPassword: undefined;
	ResendOTP: undefined; // Moved up to Auth section

	// --- Main App (Bottom Tabs) ---
	MainTabs: undefined;
	Notifications: undefined;
	Home: undefined;
	Wallet: undefined;
	Transfer: undefined;
	Savings: undefined;
	Profile: undefined;

	// --- Payment Screens ---
	Airtime: undefined;
	Data: undefined;
	Bills: undefined;

	// --- Security & Settings ---
	SetPin: undefined;
	DeleteAccount: undefined;

	// --- Support ---
	HelpCenterScreen: undefined;
	ChatSupportScreen: undefined;

	// --- KYC & Transactions ---
	KycIntro: undefined;
	DocumentUpload: undefined;
	FacialVerification: undefined;
	TransactionHistory: undefined;
	TransactionDetails: { transaction: any };
	ConfirmTransfer: { transferData: any };
	SuccessScreen: { details: any };
};
