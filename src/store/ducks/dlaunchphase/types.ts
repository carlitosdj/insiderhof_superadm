/**
 * Action types
 */
export enum LaunchPhasesTypes {
  REORDER_LAUNCHPHASES = "@extras/REORDER_LAUNCHPHASES",
  //Load
  LOAD_MYLAUNCHPHASES_REQUEST = "@extras/LOAD_MYLAUNCHPHASES_REQUEST",
  LOAD_MYLAUNCHPHASES_SUCCESS = "@extras/LOAD_MYLAUNCHPHASES_SUCCESS",
  LOAD_MYLAUNCHPHASES_FAILURE = "@extras/LOAD_MYLAUNCHPHASES_FAILURE",

  //Load
  LOAD_LAUNCHPHASES_REQUEST = "@extras/LOAD_LAUNCHPHASES_REQUEST",
  LOAD_LAUNCHPHASES_SUCCESS = "@extras/LOAD_LAUNCHPHASES_SUCCESS",
  LOAD_LAUNCHPHASES_FAILURE = "@extras/LOAD_LAUNCHPHASES_FAILURE",

  //Create
  CREATE_LAUNCHPHASES_REQUEST = "@extras/CREATE_LAUNCHPHASES_REQUEST",
  CREATE_LAUNCHPHASES_SUCCESS = "@extras/CREATE_LAUNCHPHASES_SUCCESS",
  CREATE_LAUNCHPHASES_FAILURE = "@extras/CREATE_LAUNCHPHASES_FAILURE",

  //Update
  UPDATE_LAUNCHPHASES_REQUEST = "@extras/UPDATE_LAUNCHPHASES_REQUEST",
  UPDATE_LAUNCHPHASES_SUCCESS = "@extras/UPDATE_LAUNCHPHASES_SUCCESS",
  UPDATE_LAUNCHPHASES_FAILURE = "@extras/UPDATE_LAUNCHPHASES_FAILURE",

  //Delete
  DELETE_LAUNCHPHASES_REQUEST = "@extras/DELETE_LAUNCHPHASES_REQUEST",
  DELETE_LAUNCHPHASES_SUCCESS = "@extras/DELETE_LAUNCHPHASES_SUCCESS",
  DELETE_LAUNCHPHASES_FAILURE = "@extras/DELETE_LAUNCHPHASES_FAILURE",

  //Statistics
  LOAD_PHASE_STATISTICS_REQUEST = "@extras/LOAD_PHASE_STATISTICS_REQUEST",
  LOAD_PHASE_STATISTICS_SUCCESS = "@extras/LOAD_PHASE_STATISTICS_SUCCESS",
  LOAD_PHASE_STATISTICS_FAILURE = "@extras/LOAD_PHASE_STATISTICS_FAILURE",
}

/**
 * Data types
 */
// User Imported from Me
export interface LaunchPhases {
  id?: number | undefined;
  name?: string | undefined;
  description?: string | undefined;
  slug?: string | undefined;
  order?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  status?: string | undefined;
  launchId?: number | undefined;
  extras?: any
}

// UTM Breakdown Interfaces
export interface UtmAdData {
  count: number;
  percentage: number;
  classPercentage: number;
}

export interface UtmCampaignData {
  campaignCount: number;
  campaignPercentage: number;
  ads: {
    [adName: string]: UtmAdData;
  };
}

export interface UtmSourceData {
  totalCount: number;
  totalPercentage: number;
  campaigns: {
    [campaignName: string]: UtmCampaignData;
  };
}

export interface UtmAdBreakdown {
  [scoreClass: string]: {
    [utmSource: string]: UtmSourceData;
  };
}

// Survey Statistics Interfaces
export interface QuestionStatistics {
  questionId: number;
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  totalResponses: number;
  averageScore: number;
  distribution: {
    optionText: string;
    count: number;
    percentage: number;
  }[];
}

export interface ScoreRange {
  range: string;
  count: number;
  percentage: number;
}

export interface PhaseStatistics {
  phaseId: number;
  totalResponses: number;
  questionStatistics: QuestionStatistics[];
  leadScoreAverage: number;
  leadScoreDistribution: {
    scoreRanges: ScoreRange[];
  };
  utmAdBreakdown?: UtmAdBreakdown;
}

/**
 * State type
 */
export interface LaunchPhasesState {
  readonly myLaunchPhases: LaunchPhases[];
  readonly launchPhase: LaunchPhases;
  readonly phaseStatistics: PhaseStatistics | null;
  readonly loading: boolean;
  readonly loadingStatistics: boolean;
  readonly error: boolean;
}
