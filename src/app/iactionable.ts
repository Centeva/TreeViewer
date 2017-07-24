import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export abstract class IActionable<T> {
    private _innerObservable: BehaviorSubject<T> = BehaviorSubject.create([]);

    asObservable() {
        return this._innerObservable;
    }

    public get value() {
        return this._innerObservable.getValue();
    }
    public set value(val: T) {
        this._innerObservable.next(val);
    }
}
