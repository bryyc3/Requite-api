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
    name: string,
    pointsRequired: number,
    exclusiveRewards?: Reward[]
}