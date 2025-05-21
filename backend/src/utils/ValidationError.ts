import { ZodIssue } from "zod";

export class ValidationError extends Error {
  issues: ZodIssue[];

  constructor(issues: ZodIssue[], message = "Validation failed") {
    super(message);
    this.name = "ValidationError";
    this.issues = issues;
  }
}