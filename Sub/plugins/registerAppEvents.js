import { Event } from '~/helpers/eventEmitter'
import { displayAds as registerDisplayAdQueue } from '~/events/displayAds.js'

registerDisplayAdQueue(Event) /* catch ad events until monetization scripts load */
