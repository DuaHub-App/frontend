import { environment } from "../../environments/environment";

export function getApiUrl(): string {
    return environment.API_URL;
}