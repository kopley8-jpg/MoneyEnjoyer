import { measurementUnits } from '../constants/measurementUnits';

export type PositionType =
  | {
      kind: 'money-flow';
      name: string;
    }
  | {
      kind: 'item';
      category: string;
      name: string;
      measurement: keyof (typeof measurementUnits)['item'];
    }
  | {
      kind: 'item';
      category: string;
      name: string;
      measurement: 'count';
    }
  | {
      kind: 'item';
      category: string;
      name: string;
      measurement: 'other';
    }
  | {
      kind: 'service';
      category: string;
      name: string;
      measurement: keyof (typeof measurementUnits)['service'];
    }
  | {
      kind: 'service';
      category: string;
      name: string;
      measurement: 'no-unit';
    }
  | {
      kind: 'service';
      category: string;
      name: string;
      measurement: 'other';
    };
