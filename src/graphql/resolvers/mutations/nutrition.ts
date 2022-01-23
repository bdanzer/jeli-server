const templates = [
    {
        id: 1,
        userId: 1,
        templateStructure: [
            {
                templateOrder: 1,
                name: "Meal 1"
            },
            {
                templateOrder: 2,
                name: "Snack 1"
            },
            {
                templateOrder: 3,
                name: "Meal 2"
            },
            {
                templateOrder: 4,
                name: "Snack 2"
            },
            {
                templateOrder: 5,
                name: "Meal 3"
            },
            {
                templateOrder: 6,
                name: "Snack 3"
            }
        ]
    }
]

const nutritionLog = {
    id: 1,
    templateId: 1,
    userId: 1,
    loggedMeals: [
        {
            templateId: 1,
            templateOrder: 1,
            products: [
                {
                    name: '',
                    calories: '',
                    fat: ''
                }
            ],
            // name: null,
            // savedMeal: false,
            // createdAt: 'string',
            // updatedAt: 'string'
        }
    ],
    createdAt: 'string',
    updatedAt: 'string'
}