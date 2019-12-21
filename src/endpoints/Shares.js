// @flow
import { inferShareId } from "../util/helpers";
import type {
  OrganizationDescriptor,
  RequestOptions,
  Share,
  ShareDescriptor,
  ShareInput
} from "../types";
import Endpoint from "../endpoints/Endpoint";

const headers = {
  "Abstract-Api-Version": "13"
};

export default class Shares extends Endpoint {
  create<T: Share>(
    descriptor: OrganizationDescriptor,
    shareInput: ShareInput,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<T>>({
      api: () => {
        return this.apiRequest("share_links", {
          method: "POST",
          body: {
            ...descriptor,
            ...shareInput,
            commitSha: (shareInput: any).sha
          },
          headers
        });
      },
      requestOptions
    });
  }

  info<T: Share>(
    descriptor: ShareDescriptor,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<T>>({
      api: () => {
        return this.apiRequest(`share_links/${inferShareId(descriptor)}`, {
          headers
        });
      },
      requestOptions
    });
  }
}
