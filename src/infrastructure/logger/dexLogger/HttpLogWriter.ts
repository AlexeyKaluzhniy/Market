import {ILogEntry} from "./LogEntry";
import {ILogWriter} from "./ILogWriter";

export class HttpLogWriter implements ILogWriter {
  private entries: ILogEntry[];
  private timerId: NodeJS.Timeout | null;
  private flushInterval: number = 30000;

  constructor(private url: string,
              private fetch: any,
              private flushErrorCallback: (error: Error) => void = HttpLogWriter.consoleErrorWriter,
              private predicate: (entry: ILogEntry) => boolean = (): boolean => true) {
    this.entries = [];
    this.timerId = null;
  }

  static consoleErrorWriter(error: Error): void {
    console.error("flush error ", error);
  }

  write(item: ILogEntry): void {
    if (this.predicate(item)) {
      this.entries.push(item);
      if (this.timerId == null) {
        this.timerId = setTimeout(() => this.flush(), this.flushInterval);
      }
    }
  }

  flush(): void {
    const entries = this.entries;
    this.entries = [];
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = null;

    this.fetch(`${this.url}/log`, {
      method: "POST",
      headers: {Accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify(entries)
    }).catch((reason: Error) => this.flushErrorCallback(reason));
  }
}
