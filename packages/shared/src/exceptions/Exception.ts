export abstract class Exception extends Error {
	public abstract code: string;
	public abstract message: string;
}
