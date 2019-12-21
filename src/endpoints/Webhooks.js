// @flow
import sha256 from "js-sha256";
import type {
  NewWebhook,
  OrganizationDescriptor,
  RequestOptions,
  Webhook,
  WebhookDelivery,
  WebhookDeliveryDescriptor,
  WebhookDescriptor,
  WebhookEvent
} from "../types";
import Endpoint from "../endpoints/Endpoint";

export default class Users extends Endpoint {
  list(
    descriptor: OrganizationDescriptor,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<Webhook[]>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks`
        );
      },
      requestOptions
    });
  }

  info(descriptor: WebhookDescriptor, requestOptions: RequestOptions = {}) {
    return this.configureRequest<Promise<Webhook>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/${descriptor.webhookId}`
        );
      },
      requestOptions
    });
  }

  events(
    descriptor: OrganizationDescriptor,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<WebhookEvent[]>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/events`
        );
      },
      requestOptions
    });
  }

  create(
    descriptor: OrganizationDescriptor,
    webhook: NewWebhook,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<Webhook>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/subscribe`,
          {
            method: "POST",
            body: {
              subscription: webhook
            }
          }
        );
      },
      requestOptions
    });
  }

  update(
    descriptor: OrganizationDescriptor,
    webhook: Webhook,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<Webhook>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/subscribe`,
          {
            method: "POST",
            body: {
              subscription: webhook
            }
          }
        );
      },
      requestOptions
    });
  }

  delete(descriptor: WebhookDescriptor, requestOptions: RequestOptions = {}) {
    return this.configureRequest<Promise<void>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/${descriptor.webhookId}/unsubscribe`,
          { method: "DELETE" }
        );
      },
      requestOptions
    });
  }

  ping(descriptor: WebhookDescriptor, requestOptions: RequestOptions = {}) {
    return this.configureRequest<Promise<void>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/${descriptor.webhookId}/ping`,
          { method: "POST" }
        );
      },
      requestOptions
    });
  }

  deliveries(
    descriptor: WebhookDescriptor,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<WebhookDelivery[]>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/${descriptor.webhookId}/deliveries`
        );
      },
      requestOptions
    });
  }

  redeliver(
    descriptor: WebhookDeliveryDescriptor,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<void>>({
      api: () => {
        return this.apiRequest(
          `organizations/${descriptor.organizationId}/webhooks/${descriptor.webhookId}/deliveries/${descriptor.deliveryId}/redeliver`,
          { method: "POST" }
        );
      },
      requestOptions
    });
  }

  verify(
    payload: any,
    expectedSignature: string,
    signingKey: string,
    requestOptions: RequestOptions = {}
  ) {
    return this.configureRequest<Promise<boolean>>({
      api: async () => {
        const signature = sha256.hmac(signingKey, JSON.stringify(payload));
        return signature === expectedSignature;
      },
      requestOptions
    });
  }
}
