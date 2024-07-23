export interface CharacterStatBlock {
  con: number;
  str: number;
  dex: number;
  res: number;
  agl: number;
}

interface ConStats {
  hitPoints: number;
  exousiaCapacity: number;
}

interface StrStats {
  physicalAttack: number;
  criticalHitDamage: number;
}

interface DexStats {
  criticalHitRate: number;
  accuracy: number;
}

interface ResStats {
  exousiaDefense: number;
  exousiaRecovery: number;
}

interface AglStats {
  initiative: number;
  evasion: number;
}

export interface BattleActorStatBlock {
  conStats: ConStats;
  strStats: StrStats;
  dexStats: DexStats;
  resStats: ResStats;
  aglStats: AglStats;
}
