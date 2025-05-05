import { Exception } from "./Exception.ts";

export abstract class HTTPException extends Exception {
	public abstract statusCode: number;
}
