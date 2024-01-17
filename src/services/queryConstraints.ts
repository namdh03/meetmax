import { where as firebaseWhere } from "firebase/firestore";
import { orderBy as firebaseOrderBy } from "firebase/firestore";
import { limit as firebaseLimit } from "firebase/firestore";
import { startAfter as firebaseStartAfter } from "firebase/firestore";
import { endBefore as firebaseEndBefore } from "firebase/firestore";

export const where = firebaseWhere;
export const orderBy = firebaseOrderBy;
export const limit = firebaseLimit;
export const startAfter = firebaseStartAfter;
export const endBefore = firebaseEndBefore;
