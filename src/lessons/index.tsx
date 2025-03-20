import { variables } from "./variables";
import { functions } from "./functions";
import { lists } from "./lists";
import { operators } from "./operators";
import { errors } from "./errors";
import { input } from "./input";
import { dictionaries } from "./dictionaries";
import { conditions } from "./conditions";
import { loops } from "./loops";
import { Lesson } from "../components/LessonContent";
import { textadventure } from "./textadventure";

export const lessons: Lesson[] = [
  variables,
  functions,
  lists,
  operators,
  errors,
  input,
  dictionaries,
  conditions,
  loops,
  textadventure,
];
