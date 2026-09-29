export type Business = {
    name: string,
    location: string,
    photoPath: string
};

export type Reward={
    id: string;
    name: string;
    description?: string;
    tier?: string;
    cost: number;
}

export type Tier = {
    id: string,
    name: string,
    points: number,
    exclusiveRewards?: Reward[]
}