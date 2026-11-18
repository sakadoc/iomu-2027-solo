import { HotelConfig, LandmarkConfig, SoloDestinationConfig } from '../../config/eventConfig';
import { SpeakerProfile, WorkshopPavilionConfig } from '../../data/programData';

export type SelectedFocusItem =
  | { kind: 'landmark'; data: LandmarkConfig }
  | { kind: 'pavilion'; data: WorkshopPavilionConfig }
  | { kind: 'speaker'; data: SpeakerProfile }
  | { kind: 'hotel'; data: HotelConfig }
  | { kind: 'destination'; data: SoloDestinationConfig }
  | null;
