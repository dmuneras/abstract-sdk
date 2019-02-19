// @flow
import child_process from "child_process";
import nock from "nock";
import { Readable } from "readable-stream";
import Client from "./Client";

jest.mock("child_process");

function buildTextStream(text?: string): ReadableStream {
  const stream = new Readable();
  stream._read = () => {};

  if (text) {
    stream.push(text);
    stream.push(null);
  }

  return stream;
}

export const API_CLIENT = new Client({
  apiUrl: "http://api",
  transportMode: "api"
});

export const CLI_CLIENT = new Client({
  cliPath: ".",
  transportMode: "cli"
});

export function mockCLI(
  args: string[],
  response?: Object | Array<Object>,
  error?: Object
) {
  child_process.spawn.mockClear();
  child_process.spawn.mockReturnValueOnce({
    stdout: buildTextStream(JSON.stringify(response)),
    stderr: buildTextStream(JSON.stringify(error)),
    on: (name, cb) => {
      const callArgs = child_process.spawn.mock.calls[0][1].slice(-args.length);
      expect(callArgs).toEqual(args);
      setTimeout(() => {
        name === "error" && error && cb(1);
        name === "close" && !error && cb(0);
      });
    }
  });
}

export function mockAPI(
  url: string,
  response: Object,
  code: number = 200,
  method: string = "get"
) {
  (nock("http://api"): any)[method](url).reply(code, response);
}