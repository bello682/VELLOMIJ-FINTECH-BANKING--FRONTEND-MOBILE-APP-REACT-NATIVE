export const colors = {
	primary: "#1E6AFB",
	secondary: "#00D1FF",
	darkBlue: "#0A1629",
	white: "#FFFFFF",
	surface: "#F4F7FF",
	textSecondary: "#7D8592",
	success: "#27AE60",
	error: "#FF4D4F",
	border: "#E8EFFF",
} as const;

export type AppColors = typeof colors;
