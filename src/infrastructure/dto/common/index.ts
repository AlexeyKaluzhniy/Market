import {IPageFilter} from "./IPageFilter";
import {IIdName} from "./IIdName";
import {IListControls} from "./IListControls";
import {IDataControl} from "./IDataControl";
import {IReduxParams} from "./IReduxParams";
import {IErrorData} from "./IErrorData";
import {IValidationError} from "./IValidationError";
import {IItemIdName} from "./IItemIdName";

export type IdNameDto = IIdName;
export type PageFilter = IPageFilter;
export type ListControls = IListControls & IDataControl;
export type DataControls = IDataControl;
export type ReduxParams<TRes, TParams = any> = IReduxParams<TRes, TParams>;
export type ActionPayload<TRes, TParams = any> = {} & {payload: ReduxParams<TRes, TParams>};
export type ErrorData = IErrorData;
export type ItemIdNameDto = IItemIdName;
export type ValidationError = IValidationError;
