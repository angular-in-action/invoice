import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { HoursValidator } from '../validators/hours.validator';

@Component({
  selector: 'app-hours-control',
  templateUrl: './hours-control.component.html',
  styleUrls: ['./hours-control.component.css'],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HoursControlComponent),
    multi: true
  }, { 
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => HoursControlComponent),
    multi: true
  }]
})
export class HoursControlComponent implements ControlValueAccessor {

  hours = 0;
  validateFn = HoursValidator;
  onChange = (v: any) => {};

  update() {
    this.onChange(this.hours);
  }

  keypress($event) {
    if ($event.key === 'ArrowUp') {
      this.setValue(.25);
    } else if ($event.key === 'ArrowDown') {
      this.setValue(-.25);
    }
  }

  setValue(change: number) {
    this.hours += change;
    this.update();
  }

  validate(control: FormControl) {
    return this.validateFn(control);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.hours = value;
    }
  }
  
  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {}
}
