export type LaneType =
| 'bidirectionnelle'
| 'bilaterale'
| 'voie-verte'
| 'velorue'
| 'voie-verte'
| 'bandes-cyclables'
| 'zone-de-rencontre'
| 'zone-30'
| 'itineraire-conseille'
| 'aucun'
| 'inconnu';

export type LaneDirection = 'unidirectionel' | 'bidirectionel' | 'unknown'

export type LaneStatus = 'done' | 'wip' | 'planned' | 'tested' | 'postponed' | 'unknown' | 'variante' | 'variante-postponed';

export type LineStringFeature = {
  type: 'Feature';
  properties: {
    id?: string
    line: number;
    name: string;
    status: LaneStatus;
    type: LaneType;
    doneAt?: string;
    link?: string;
  };
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
};

export type PerspectiveFeature = {
  type: 'Feature';
  properties: {
    type: 'perspective';
    line: number;
    name: string;
    imgUrl: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type CompteurFeature = {
  type: 'Feature';
  properties: {
    type: 'compteur-velo' | 'compteur-voiture';
    line?: number;
    name: string;
    link?: string;
    counts: Array<{
      month: string;
      count: number;
    }>;
    /**
     * z-index like
     */
    circleSortKey?: number;
    circleRadius?: number;
    circleStrokeWidth?: number;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type PumpFeature = {
  type: 'Feature';
  properties: {
    type: 'pump',
    name: string
  }
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export type DangerFeature = {
  type: 'Feature';
  properties: {
    type: 'danger',
    name: string
  }
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

type PointFeature = PerspectiveFeature | CompteurFeature | PumpFeature | DangerFeature;

export type Feature = LineStringFeature | PointFeature;

export type Geojson = {
  type: string;
  features: Feature[];
};

/**
 * type helpers
 */
export function isLineStringFeature(feature: Feature): feature is LineStringFeature {
  return feature.geometry.type === 'LineString';
}

export function isPointFeature(feature: Feature): feature is PointFeature {
  return feature.geometry.type === 'Point';
}

export function isPerspectiveFeature(feature: Feature): feature is PerspectiveFeature {
  return isPointFeature(feature) && feature.properties.type === 'perspective';
}

export function isDangerFeature(feature: Feature): feature is PerspectiveFeature {
  return isPointFeature(feature) && feature.properties.type === 'danger';
}

export function isPumpFeature(feature: Feature): feature is PumpFeature {
  return isPointFeature(feature) && feature.properties.type === 'pump';
}

export function isCompteurFeature(feature: Feature): feature is CompteurFeature {
  return isPointFeature(feature) && ['compteur-velo', 'compteur-voiture'].includes(feature.properties.type);
}