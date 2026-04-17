function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} is required`);
  }
  return value.trim();
}

export function validateActorDescriptor(input) {
  const descriptor = {
    id: assertNonEmptyString(input?.id, "descriptor.id"),
    label: assertNonEmptyString(input?.label, "descriptor.label"),
    wrapperKind: assertNonEmptyString(input?.wrapperKind, "descriptor.wrapperKind"),
    role: assertNonEmptyString(input?.role, "descriptor.role"),
    classification: assertNonEmptyString(input?.classification, "descriptor.classification"),
    behavior: assertNonEmptyString(input?.behavior, "descriptor.behavior")
  };

  if (descriptor.wrapperKind !== "runner") {
    throw new Error(`Unsupported wrapperKind '${descriptor.wrapperKind}'.`);
  }

  if (!["org", "ratifier"].includes(descriptor.role)) {
    throw new Error(`Unsupported actor role '${descriptor.role}'.`);
  }

  return descriptor;
}

