const template = {}

const maxDays = 84

const programs = {
    phases: [
        {
            phaseName: 'Weeks 1 - 4',
            weeks: [
                {
                    weekName: 'Week 1',
                    description: 'this week we are going to turn up',
                    days: [
                        {
                            day: 1,
                            exerciseCluster: null // rest day
                        },
                        {
                            day: 2,
                            exerciseCluster: [
                                {
                                    name: 'Warm ups',
                                    exercises: [
                                        {
                                            exerciseName: 'hello',
                                            restSeconds: 30 // integer at least greater than 1 second
                                        }
                                    ]
                                },
                                {
                                    name: 'Weights',
                                    exercises: []
                                }
                            ]
                        },
                        {
                            day: 3,
                            exercises: null // rest day
                        },
                        {
                            day: 4,
                            exerciseCluster: {}
                        },
                        {
                            day: 5,
                            exerciseCluster: {}
                        },
                        {
                            day: 6,
                            exerciseCluster: {}
                        },
                        {
                            day: 7,
                            exerciseCluster: {}
                        }
                    ]
                }
            ]
        }
    ]
}