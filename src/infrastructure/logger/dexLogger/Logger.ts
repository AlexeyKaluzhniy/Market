import {Guid, guid} from "./guid";
import {ILogWriter} from "./ILogWriter";
import {LogEntryType} from "./LogEntryType";
import {ILogEntry} from "./LogEntry";

export class Logger {
    private readonly logId: Guid;
    private readonly categories: string[];
    private readonly references: Guid[];
    private readonly writers: ILogWriter[];

    constructor(writers: ILogWriter[], categories: string[] = [], references: Guid[] = [], logId: Guid = guid()) {
        this.categories = categories;
        this.references = references;
        this.logId = logId;
        this.writers = writers;
    }

    addReference(reference: Guid): void {
        this.references.push(reference);
    }

    clearReferences(): void {
        this.references.splice(0, this.references.length);
    }

    suppress(
        msg: string,
        infoObject: object | null = null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): void {
        this.write(LogEntryType.Suppress, null, msg, infoObject, categories, references, memberName, fileName, lineNumber);
    }

    trace(references: Guid[] | null = null, memberName: string = "", fileName: string = "", lineNumber: number = 0): void {
        let shortFileName: string;
        if (fileName.length > 0) {
            const last = fileName.split("/").pop();
            shortFileName = last ? last : "";
        } else {
            shortFileName = "";
        }

        this.write(LogEntryType.Trace, null, shortFileName + ": " + memberName, null, null, references, memberName, fileName, lineNumber);
    }

    warning(
        msg: string,
        infoObject: object | null = null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): void {
        this.write(LogEntryType.Warning, null, msg, infoObject, categories, references, memberName, fileName, lineNumber);
    }

    info(
        msg: string,
        infoObject: object | null = null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): void {
        this.write(LogEntryType.Info, null, msg, infoObject, categories, references, memberName, fileName, lineNumber);
    }

    critical(
        msg: string,
        exception: Error,
        infoObject: object | null = null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): void {
        this.write(LogEntryType.Critical, exception, msg, infoObject, categories, references, memberName, fileName, lineNumber);
    }

    exception(
        exception: Error,
        msg: string = exception.toString(),
        infoObject: object | null = null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): void {
        this.write(LogEntryType.Exception, exception, msg, infoObject, categories, references, memberName, fileName, lineNumber);
    }

    log(
        msg: string,
        infoObject: object | null = null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): void {
        this.write(LogEntryType.Debug, null, msg, infoObject, categories, references, memberName, fileName, lineNumber);
    }

    async logPromise<T>(
        promise: Promise<T>,
        msg: string,
        infoObject: object | null,
        categories: string[] | null = null,
        references: Guid[] | null = null,
        memberName: string = "",
        fileName: string = "",
        lineNumber: number = 0,
    ): Promise<T> {
        const startDate = new Date();
        this.write(LogEntryType.Start, null, msg, infoObject, categories, references, memberName, fileName, lineNumber);
        try {
            return await promise;
        } catch (e) {
            this.write(LogEntryType.Exception, null, msg, infoObject, categories, references, memberName, fileName, lineNumber);
            throw e;
        } finally {
            const endDate = new Date();
            const elapsed = endDate.getTime() - startDate.getTime();
            this.write(LogEntryType.Finish, null, msg, {
                info: infoObject,
                elapsed,
            }, categories, references, memberName, fileName, lineNumber);
        }
    }

    private write(
        type: LogEntryType,
        exception: Error | null,
        msg: string,
        infoObject: object | null,
        categories: string[] | null,
        references: Guid[] | null,
        memberName: string,
        fileName: string,
        lineNumber: number,
    ): void {
        categories = categories ? this.categories.concat(categories) : this.categories;
        references = references ? this.references.concat(references) : this.references;
        const info = exception ? {infoObject: infoObject, exception: exception} : infoObject;

        const entry: ILogEntry = {
            Categories: categories,
            FileName: fileName,
            Info: info ? info : {},
            LineNumber: lineNumber,
            LogId: this.logId,
            MemberName: memberName,
            References: references,
            Type: type,
            Utc: new Date(),
            Msg: msg,
        };

        this.writers.forEach(w => w.write(entry));
    }
}

