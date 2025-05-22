import React from 'react';


export const apikeyStage = 'HOPTGTOFd8VvGniFyTmFWdToYlARFcbihJs5BCE620b90007ff';
export const apikeyTesting = 'iO4vouUk2ZQ1FvdIKIrlZGdTSztVhkTcBhdRJkIxLX86242a0b';
export const apikeyProdFrostBank = 'yTxVFvPJjVp6WqJgi9FAjqnU3wq4CuFYsnP5SHac3tg64f795c';

export function renderTestCases ()  {
    return (
        <React.Fragment>
             <button class='ecal-sync-widget-button' id='ecal-sync-widget-button'
                data-ecal-widget-id='6811b59080f3bc0008272a80'
            >
                Main   Sync to Calendar
            </button>
 
            <button class="ecal-sync-widget-button small e-cal" 
                title="Sync to Calendar" 
                    data-ecal-widget-id="6811b59080f3bc0008272a80"
                    data-ecal-calendar-reference="armstrong,FNC-Schedules" data-ecal-no-styling="">
                San Antonio
            </button>


            <button class="ecal-sync-widget-button small e-cal" 
                title="Sync to Calendar" 
                data-ecal-widget-id="6811b59080f3bc0008272a80" 
                data-ecal-calendar-reference="armstrong" 
                data-ecal-no-styling="">
                Alejandro Fernández
            </button>

            <button class="ecal-sync-widget-button small e-cal" title="Sync to Calendar"
                data-ecal-widget-id="6811b59080f3bc0008272a80"
                    data-ecal-calendar-reference="FNC-Schedules" data-ecal-no-styling="">
                Cody Johnson
            </button>

        <button class="ecal-sync-widget-button small e-cal" title="Sync to Calendar"
                data-ecal-widget-id="6811b59080f3bc0008272a80"
                    data-ecal-calendar-reference="New York" data-ecal-no-styling="">
                NO Data
            </button>
        </React.Fragment>
    );
}

export function renderProdFrostBankCases ()  {
    return (
        <React.Fragment>
            
            <button class='ecal-sync-widget-button' id='ecal-sync-widget-button'
                data-ecal-widget-id='64f7b4ae18e154000d9036ac'
            >
                Main   Sync to Calendar
            </button>
        

            <button class='ecal-sync-widget-button' id='ecal-sync-widget-button'
                data-ecal-widget-id='64f7b4ae18e154000d9036ac'
                data-ecal-no-styling=""
            >
                Main Button Sync to Calendar
            </button>


            <button class="ecal-sync-widget-button small e-cal" 
                title="Sync to Calendar" 
                    data-ecal-widget-id="64f7b4ae18e154000d9036ac"
                    data-ecal-calendar-reference="event-2025-4058" data-ecal-no-styling="">
                San Antonio
          </button>


            <button class="ecal-sync-widget-button small e-cal" 
                title="Sync to Calendar" 
                data-ecal-widget-id="64f7b4ae18e154000d9036ac" 
                data-ecal-calendar-reference="event-2010-4039" 
                data-ecal-no-styling="">
                Alejandro Fernández
          </button>

            <button class="ecal-sync-widget-button small e-cal" title="Sync to Calendar"
                data-ecal-widget-id="64f7b4ae18e154000d9036ac"
                    data-ecal-calendar-reference="event-2019-4053" data-ecal-no-styling="">
                Cody Johnson
          </button>
        </React.Fragment>
    );
}