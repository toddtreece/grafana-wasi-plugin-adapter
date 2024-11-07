export function convertObjects(request: ConversionRequest): ConversionResponse {
  const res: ConversionResponse = {
    uid: request.uid,
    status: {
      status: "Success",
      message: "Converted successfully",
      reason: "",
      code: 0,
    },
    objects: [],
  };
  return res;
}

// GroupVersion represents the API group and version of a resource.
type GroupVersion = {
  group: string;
  version: string;
};

// RawObject contains a resource serialized into a byte array with a content type
type RawObject = {
  // Raw is the serialized object
  raw: string;
  // ContentType is the media interface of the raw object
  content_type: string;
};

// ConversionRequest supports converting objects from one version to another
type ConversionRequest = {
  // uid is an identifier for the individual request/response. It allows distinguishing instances of requests which are
  // otherwise identical (parallel requests, etc).
  // The UID is meant to track the round trip (request/response) between the Kubernetes API server and the webhook, not the user request.
  // It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging.
  uid: string;

  // Objects to convert
  // +listType=atomic
  objects: RawObject[];

  // Target converted version
  target_version: GroupVersion;
};

// ConversionResponse contains the converted objects
type ConversionResponse = {
  // uid is an identifier for the individual request/response.
  // This should be copied over from the corresponding `request.uid`.
  uid: string;

  // status contains extra details into why an admission request was denied.
  status: StatusResult | undefined;

  // objects is the list of converted version of `request.objects` if the `result` is successful, otherwise empty.
  // +listType=atomic
  objects: RawObject[];
};

// Status structure is copied from:
// https://github.com/kubernetes/apimachinery/blob/v0.30.1/pkg/apis/meta/v1/generated.proto#L979
type StatusResult = {
  // Status of the operation.
  // One of: "Success" or "Failure".
  // More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
  // +optional
  status: string;
  // A human-readable description of the status of this operation.
  // +optional
  message: string;
  // A machine-readable description of why this operation is in the
  // "Failure" status. If this value is empty there
  // is no information available. A Reason clarifies an HTTP status
  // code but does not override it.
  // +optional
  reason: string;
  // Suggested HTTP return code for this status, 0 if not set.
  // +optional
  code: number;
};
