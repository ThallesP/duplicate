import type { schemas } from "@duplicate/db";
import { Path } from "../../entities/value-objects/Path.ts";

export class PathMapper {
	public static toPersistence(path: Path) {
		return {
			path: path.value,
		};
	}

	public static toDomain({ path }: schemas.PathsColumn[number]): Path {
		return Path.restore(path);
	}
}
