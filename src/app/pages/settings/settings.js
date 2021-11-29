export const settingsApi = {
    heading: 'Settings',
    subMenu: {
        linkPomodoros: {
            linkText: 'Pomodoros',
            subHeading: 'Pomodoros settings',
            categories: {
                categoryWork: {
                    title: 'Work time',
                    text: 'Please select a value between 15 and 60',
                    subText: 'minutes'
                },
                categoryIteration: {
                    title: 'Work iteration',
                    text: 'Please select a value between 2 and 5',
                    subText: 'iterations'
                },
                categoryShortBreak: {
                    title: 'Short break',
                    text: 'Please select a value between 3 and 10',
                    subText: 'minutes'
                },
                categoryLongBreak: {
                    title: 'Long break',
                    text: 'Please select a value between 15 and 30',
                    subText: 'minutes'
                }
            },
            cycleHeading: 'Your cycle',
            buttons: {
                btnPrimary: 'Go to tasks',
                btnSecondary: 'Save',
            }
        },

        linkCategories: {
            linkText: 'Categories',
            subHeading: 'Categories list overview',
            categories: {
                categoryWorkTitle: 'Work',
                categoryEducationTitle: 'Education',
                categoryHobbyTitle: 'Hobby',
                categorySportTitle: 'Sport',
                categoryOtherTitle: 'Other'

            },
            buttonText: 'Go to tasks'
        }
    },
}