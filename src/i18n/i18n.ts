import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          noRecords: 'No records found',
          modal: {
            close: 'Close',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            add: 'Add',
            remove: 'Remove',
            confirm: 'Confirm',
            edit: 'Edit',
          },
          observer: 'Observer',
          referee: 'Referee',
          referee_many: 'Referees',
          leagueAdmin: 'League admin',
          owner: 'Owner',
          grade: 'Grade',
          grade_many: 'Grades',
          grade_many_lowercase: 'grades',
          match: 'Match',
          match_many: 'Matches',
          hero: {
            description: 'Easily manage your league by keeping track of its officials',
            logIn: 'Log in with Google',
          },
          pageNames: {
            calendar: 'Calendar',
            dashboard: 'Dashboard',
            explorer: 'Leagues',
            conclusions: 'Conclusions',
          },
          userMenu: {
            settings: 'Settings',
            logOut: 'Log out',
          },
          explorer: {
            logOut: 'Log out',
            select: 'Select',
            addLeague: 'Add league',
            addModal: {
              title: 'Add league',
              name: 'Name',
              shortName: 'Short name',
              country: 'Country',
            },
          },
          settingsModal: {
            title: 'Settings',
            changeLanguage: 'Language',
            deleteLeague: 'Delete league',
          },
          matches: {
            title: 'Matches',
            past: 'Past',
            upcoming: 'Upcoming',
            gradeOverdue: 'Grade overdue',
            searchMatch: 'Search match',
            upload: 'Upload',
            add: 'Add',
            status: 'Status',
            addModal: {
              title: 'Add match',
              date: 'Date',
              stadium: 'Stadium',
              stadiumPH: 'stadium',
              homeTeam: 'Home team',
              homeTeamPH: 'Choose home team',
              awayTeam: 'Away team',
              awayTeamPH: 'Choose away team',
              refereePH: 'Assign referee',
              observerPH: 'Assign observer',
            },
            deleteModal: {
              title: 'Delete match',
              confirm: 'Are you sure you want to delete the following match?',
              warning: "You can't undo this action afterwards.",
            },
            uploadModal: {
              title: 'Upload matches',
              description: 'Choose or drop a file here.',
            },
            uploadConfirmModal: {
              confirm: 'The following matches will be created',
            },
          },
          grades: {
            title: 'Grades',
            recent: 'Recent',
            searchMatch: 'Search match',
            all: 'All',
            received: 'Received',
            overdue: 'Overdue',
            pending: 'Pending',
            expected: 'Expected',
          },
          conclusions: {
            type: 'Type',
            description: 'Description',
            positive: 'Positive',
            negative: 'Negative',
          },
          teams: {
            title: 'Teams',
            search: 'Search team',
            edit: 'Edit team',
            delete: 'Delete team',
            deleteConfirm: 'Are you sure you want to delete this team?',
            deleteWarning: "You can't undo this action afterwards.",
            name: 'Name',
            addModal: {
              title: 'Add team',
            },
          },
          referees: {
            remove: 'Remove referee',
            removeConfirm: 'Are you sure you want to remove the following referee from this league?',
            addModal: {
              title: 'Add referee to league',
              select: 'Select referee',
            },
          },
          observers: {
            remove: 'Remove observer',
            removeConfirm: 'Are you sure you want to remove the following observer from this league?',
            addModal: {
              title: 'Add observer to league',
              select: 'Select observer',
            },
          },
          league: {
            deleteModal: {
              title: 'Delete league',
              matchesWarning: 'If you remove this league all its matches and their grades will also be purged.',
              questionWarning: 'Are you sure you want to delete this league?',
              reverseWarning: 'This operation cannot be reversed.',
              confirm: 'Confirm by rewriting this text',
              text: 'Text',
            },
          },
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          matchPage: {
            sections: 'Page sections',
            details: {
              title: 'Match details',
              date: 'Date',
              time: 'Time',
              stadium: 'Stadium',
              homeTeam: 'Home team',
              awayTeam: 'Away team',
              editTitle: 'Edit match details',
            },
            grade: {
              title: 'Grade',
              grade: 'Grade',
              date: 'Grade date',
              editModal: {
                title: 'Edit match grade',
                input: 'Referee grade',
              },
            },
            overallGrade: {
              title: 'Overall grade',
              date: 'Description date',
              editModal: {
                title: 'Edit match overall grade',
                textArea: 'Overall grade',
              },
            },
            assignments: {
              title: 'Assignments',
              editModal: {
                title: 'Edit assignments',
              },
            },
            sanctions: {
              title: 'Disciplinary sanctions',
              correct: 'correct',
              incorrect: 'incorrect',
              minute: 'Minute',
              card: 'Card',
              player: 'Player',
              playerNumber: 'Player number',
              team: 'Team',
              description: 'Description',
              validity: 'Validity',
              modal: {
                title: 'disciplinary sanctions',
              },
              red: 'red',
              yellow: 'yellow',
            },
            conclusions: {
              title: 'Conclusions',
              modal: {
                title: 'conclusion',
              },
            },
            note: {
              title: 'Referee note',
              editModal: {
                title: 'Edit referee note',
              },
            },
            reports: {
              title: 'Reports',
              report: 'report',
              mentor: 'mentor',
              observer: 'observer',
              tv: 'tv',
              download: 'Download',
              empty: 'Empty',
              uploaded: 'Uploaded',
              uploadMessage: 'Choose or drop a file here.',
            },
          },
        },
      },
      pl: {
        translation: {
          modal: {
            close: 'Zamknij',
            save: 'Zapisz',
            cancel: 'Anuluj',
            delete: 'Usuń',
            add: 'Dodaj',
          },
          hero: {
            description: 'Łatwo zarządzaj ligą poprzez nadzór nad jej urzędnikami',
            logIn: 'Zaloguj się z Google',
          },
          explorer: {
            logOut: 'Wyloguj',
            select: 'Wybierz',
            addLeague: 'Dodaj ligę',
            addModal: {
              title: 'Dodaj ligę',
              name: 'Nazwa',
              shortName: 'Skrót nazwy',
              country: 'Kraj',
            },
          },
          settingsModal: {
            title: 'Ustawienia',
            changeLanguage: 'Zmień język',
          },
        },
      },
    },
  });
