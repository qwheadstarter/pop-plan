export const quiz = {
    totalQuestions: 8,
    questions: [
        {
            id: 1,
            question: 'What type of activities do you enjoy? (check all that apply)',
            answers: [
                'Outdoor adventures',
                'Visiting museums or cultural events',
                'Socializing with friends',
                'Food centered',
                'Arts, Crafting, or DIY projects',
                'Watching movies or the theater',
                'Sporting events',
                'None of the above'
            ],
            category: 'Activities',
        },
        {
            id: 2,
            question: 'What kind of social settings do you feel comfortable in? (Check all that apply)',
            answers: [
                'Large gatherings or parties',
                'Small get-togethers with close friends',
                'One-on-one conversations',
                'Being alone or with family',
                'Outdoor group activities',
                'Networking events or professional settings'
            ],
            category: 'social personality',
        },
        {
            id: 3,
            question: 'When choosing a vacation, which of these is most important to you? (check all that apply)',
            answers: [
                'Relaxation',
                'Adventure',
                'Cultural experiences',
                'Trying new foods',
                'Learning something new',
                'Socializing and meeting new people'
            ],
            category: 'vacation activities',
        },
        {
            id: 4,
            question: 'What is a hobby or special interest that you enjoy? (fill in the blank)',
            answers: [''],
            category: 'hobbies and interests',
        },
        {
            id: 5,
            question: 'Which of these foods do you enjoy?',
            answers: [
                'Mexican',
                'American',
                'French',
                'East Asian',
                'South Asian',
                'Italian',
                'Middle Eastern',
                'Seafood',
                'Soul food',
                'BBQ',
                'Greek',
                'European',
                'Healthy',
                'Regional specialties',
                'Sweets/bakery',
                'Bars',
                'None of the above'
            ],
            category: 'Food preference',
        },
        {
            id: 6,
            question: 'Do you have any physical or other limitations to consider (food limitations, physical disabilities, etc.)?',
            answers: [
                'Yes',
                'No',
            ],
            category: 'disability and/or restrictions',
        },
        {
            id: 7,
            question: 'Which forms of transportation do you have access to? (check all that apply)',
            answers: [
                'Walking',
                'Car',
                'Bike',
                'Public transportation'
            ],
            category: 'preferred transportation method',
        },
        {
            id: 8,
            question: 'What kind of music do you enjoy? (Check all that apply)',
            answers: [
                'Top 100',
                'Rock',
                'Rap',
                'Electronic',
                'Classical',
                'Folk',
                'Jazz',
                'Cultural',
                'Indie',
                'Country',
                'Classic rock',
                'Gospel',
                'None of the above'
            ],
            category: 'preferred music genres',
        }
    ],
};