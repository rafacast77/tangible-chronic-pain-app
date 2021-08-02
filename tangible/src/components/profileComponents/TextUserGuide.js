export const userGuide = {
  userGuideDesc:
    "This user guide includes an explanation for each of the screens found on the bottom menu. Each explanation includes screen functionality" +
    "and step by step instructions on how to perform them. Click the arrows to expand each of the explanations for each screen an d scroll down to read the" +
    "full text.",
  entries: [
    {
      description:
        'In this screen the user can record current or past pain episodes. To start a new pain entry select the date a click "Next',
    },
    {
      title: "Date and Time",
      description:
        "In this screen, the user can select the date on which the pain episode occurred. On the calendar component, " +
        "at the top of the calendar, the user can select the month and year by pressing the directional arrows",
    },
    {
      title: "Pain Location",
      description:
        'Initially, this screen will be empty. The user will have to click "ADD LOCATIONS" and then click on "ADD NEW" and type the location in the body where the pain is felt. \n' +
        "The User can choose to 'edit' or 'delete' an added location by clicking on the 'pen' or 'bin' icon. \n The user can enable or disable a body location so that" +
        "It appears in the main screen",
    },
    {
      title: "Pain Scale",
      description:
        'The user can use the vertical scale to select the intensity of the pain between 0-10. 0 stands for "no pain", and 10 stands for the "worst pain imaginable".' +
        "Every time the user picks a different level of intensity, a description corresponding to that intensity will be shown. Descriptions are meant to help" +
        "the user choose the accurate intensity of the pain.",
    },
    {
      title: "Medication",
      description:
        'Initially, this screen will be empty. The user will have to click "ADD MEDICATION" and then click on "ADD NEW" and type the medication taken to ease the pain. \n' +
        "The user can choose to 'edit' or 'delete' an added medication by clicking on the 'pen' or 'bin' icon. \n The user can enable or disable a medication so that" +
        "It appears in the main screen",
    },
    {
      title: "Treatments",
      description:
        'Initially, this screen will be empty. The user will have to click "ADD TREATMENTS" and then click on "ADD NEW" and type the treatment taken to ease the pain. \n' +
        "The user can choose to 'edit' or 'delete' an added treatment by clicking on the 'pen' or 'bin' icon. \n The user can enable or disable a treatment so that" +
        "It appears in the main screen",
    },
    {
      title: "Extra Comments",
      description:
        "The user can write additional comments about the pain episode. Once the user has finished writing, he can press the submit button at the bottom to conclude the pain entry form currently recorded.",
    },
  ],
  stats: [
    {
      description:
        "The user can view insightful information about the pain and how certain factors such as medicine or treatments relate to it.\n" +
        "There are seven charts that display information about the pain. Each chart has a title explaining its purpose and an informational" +
        'tooltip ("Icon") explaining how to understand it. Explanations of these charts can also be found below.',
    },
    {
      title: "Pain Intensity - Scale Frequency",
      description:
        "This chart shows the total amount of times a user has recorded a pain episode. The intensity level recorded during an episode has been distributed" +
        "across five different pain categories. This chart can keep a user accountable for the number of entries recorded. It also helps to have a general" +
        "understanding and classify their overall pain severity.",
    },
    {
      title: "Pain Intensity - Time Periods",
      description:
        "This chart shows the average pain level and pain occurrences across four-time categories. Each category represents a range of times in a day. \n" +
        "This chart helps to understand at what time throughout the day the pain is most severe. This user can use this to find trends, " +
        "e.g.(when the pain was most or less severe) by investigating the habits during those periods, enabling them to adopt better or discontinue poor habits.",
    },
    {
      title: "Pain Location",
      description:
        "This chart shows the number of times a body location has been selected when filling a pain entry form. It also shows the most prevalent body" +
        "location affected by the pain. \n This chart helps the user to understand the parts of their body which are commonly affected by the pain, " +
        "enabling them to choose the proper medication and treatment to mitigate the pain.",
    },
    {
      title: "Negative Effect",
      description:
        'This chart shows the number of times a pain mitigation method was classified as "worse" when filling a pain entry form. It also shows which' +
        "methods have the most harmful results when treating the pain. \n This chart can help the user to keep accountability of how many times a method" +
        "has been utilized. It also helps the user to recognize which methods are not suitable for them and must be discontinued.",
    },
    {
      title: "Positive Effect",
      description:
        'This chart shows the number of times a pain mitigation method was classified as "Better" when filling a pain entry form. It also shows which' +
        "methods have the most beneficial results when treating the pain. \n This chart can help the user to keep accountability of how many times a " +
        "method has been utilized. It also helps the user recognize which methods have worked in the past and should not be abandoned.",
    },
    {
      title: "Ineffectual Factors",
      description:
        'This chart shows the number of times a pain mitigation method was classified as "No change" when filling a pain entry form. It also shows ' +
        "which methods have no effects when treating the pain. \n This chart can help the user to keep accountability of how many times a method has" +
        "been utilized. It also helps the user to recognize which methods are ineffective for them could be discontinued.",
    },
  ],
  records: [
    {
      description:
        "The user can scroll down to see past logs corresponding to the current month. If the user wants to check a previous month," +
        "he can interact with the date-changer at the top of the screen, which allows him to select previous months by clicking on the arrows." +
        "Additionally, the user can press on the informational tooltip to obtain instructions on how to operate this screen.",
    },
    {
      title: "Downloading Records",
      description:
        "The user can download logs as a CSV file by clicking on the download icon on the top-right corner.",
    },
  ],
  profile: [
    {
      description:
        "The user can record or access personal information. The user can also manage spectators, set reminders, customize the app and read the user guide. There are five sections in the profile screen which are discussed below.",
    },
    {
      title: "Account Information",
      description:
        "This section manages the information in the account. The user can see account type, email, change password or choose a name associated with the account. This information is used when connecting with spectators and storing pain records in the cloud. ",
    },
    {
      title: "Spectators",
      description:
        "This section will look differently depending on the user being a spectator or a chronic pain user. The section allows spectator and pain user to manage connections between them.",
    },
    {
      subTitle1: 'Spectators for "Chronic Pain User"',
      description:
        "The user can change permissions for spectators by pressing the circle-shape button to enable or disable the spectator's ability to see their information.",
    },
    {
      subTitle2: "Adding a new spectator",
      description:
        'The user can add spectators by clicking on the "Add New" button and enter the email associated with the Tangible account of the spectator they wish to connect.',
    },
    {
      subTitle2: "Removing a spectator",
      description:
        'The user can remove a spectator in the spectator\'s section by pressing the vertical three-dot icon ("Icon") and then pressing on the option "Delete".',
    },
    {
      subTitle2: "What information can a spectator see?",
      description:
        'The pain user can select the information that a spectator is allowed to see. The user can exclude different factors, e.g.(medicine, negative effect chart). To choose what information a spectator can see, the user must go to the spectator\'s section and press on the vertical three-dot icon ("Icon")  on the spectator name he desires to customize; the user can press the "Sharing Options" button and choose which factors that spectator is allowed to see by checking or onchecking the boxes in that window.',
    },
    {
      subTitle1: 'Spectators for "Spectator User"',
      description:
        "The user can select which pain users he wishes to spectate by pressing the circle-shape button to enable or disable the pain user hence stopping all notifications associated with that pain user. The spectator can also see requests sent by a pain user in order to be spectated. The spectator can also manage other pain user options discussed below. ",
    },
    {
      subTitle2: "Accepting/Deleting Request",
      description:
        'When a pain user sends a spectator request, a tooltip showing requests will appear in the spectator section ("Icon"). To accept a request, the user can press the "accept" button or press the vertical three-dot icon ("Icon") and choose to delete the request.',
    },
    {
      subTitle2: "Notify the spectator when the pain user has an episode.",
      description:
        'By selecting the three-dot icon ("Icon") in an existing pain user on the spectator section, the spectator can select the notifications button and choose a threshold to be notified when the pain user has a pain episode above or below a chosen threshold.',
    },
    {
      title: "Customize Pain Scale",
      description:
        'In the customize scale section, the user can select a number from the pain scale and edit the description on the right. The user must press the "Apply" button for the changes to take effect.',
    },
  ],
};
