import { api } from "@/lib/axios";

export interface SignInBody {
	email: string;
}

export async function signIn({ email }: SignInBody): Promise<void> {
	await api.post("/authenticate", { email });
}
