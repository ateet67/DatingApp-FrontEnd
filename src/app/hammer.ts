import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    override overrides = <any>{
        swipe: { direction: Hammer.DIRECTION_ALL },
    };
}