import { v7 as uuid } from "uuid";

export class UniqueEntityID {
	private value: string;

	toString() {
		return this.value;
	}

	toValue() {
		return this.value;
	}

	constructor(value?: string) {
		this.value = value ?? uuid();
	}

	public equals(id: UniqueEntityID) {
		return id.toValue() === this.value;
	}
}
