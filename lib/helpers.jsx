import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'

function fixedEth (wei) {
  return BigNumber(wei.toString(10)).dividedBy('1e13')
    .integerValue(BigNumber.ROUND_CEIL)
    .dividedBy('1e5').toFixed();
}

function copyToClipboard (text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);
}

function showSendTransactionToasts(balance, amount="1") {
  toast.info('Now authorize the transaction in your browser');
  if (window.web3.utils.toBN(balance).lt(window.web3.utils.toBN(amount)))
    toast.warning('You need to add funds to your account', { delay: 1000 });
}

const flags = {
  set creatingLocker (val) {
    if (val)
      window.localStorage.setItem('creating_locker_contract', val);
    else
      window.localStorage.removeItem('creating_locker_contract');
    return val;
  },

  get creatingLocker () {
    return window.localStorage.getItem('creating_locker_contract');
  }
}

function addressToEmoji(address) {
  const bytes = [];
  for (let i=2; i<12; i+=2)
    bytes.push(parseInt(address.substr(i, 2), 16));
  return bytes.map(byte => String.fromCodePoint(emojis[byte])).join('');
}

const emojis =
[8987,9748,9800,9801,9802,9803,9804,9805,9806,9807,9808,9809,9810,9811,9875,9889,
9917,9918,9924,9940,9971,10060,11035,11088,11093,126980,127383,127752,127754,127755,127757,127760,
127761,127769,127789,127794,127797,127799,127800,127808,127810,127812,127814,127815,127816,127817,127818,127819,
127820,127821,127826,127828,127829,127830,127839,127841,127846,127849,127850,127851,127853,127855,127856,127860,
127863,127865,127866,127870,127871,127872,127875,127880,127884,127891,127910,127911,127912,127913,127914,127916,
127918,127919,127920,127921,127923,127924,127927,127928,127929,127930,127931,127932,127936,127937,127942,127944,
127948,127951,127954,127955,127968,127982,127993,128007,128010,128017,128020,128024,128025,128029,128030,128037,
128042,128045,128051,128052,128054,128055,128056,128059,128064,128066,128067,128069,128072,128073,128077,128078,
128081,128083,128092,128094,128096,128105,128110,128116,128117,128123,128125,128128,128130,128131,128132,128139,
128140,128141,128142,128144,128150,128151,128152,128153,128154,128155,128156,128157,128158,128161,128163,128164,
128165,128166,128167,128168,128169,128172,128175,128176,128184,128188,128191,128202,128203,128204,128216,128225,
128239,128247,128250,128256,128260,128264,128267,128269,128273,128274,128276,128293,128296,128302,128304,128308,
128309,128310,128311,128347,128400,128420,128512,128514,128519,128520,128525,128526,128536,128541,128561,128564,
128567,128570,128571,128575,128577,128579,128584,128591,128640,128645,128660,128662,128672,128678,128681,128682,
128683,128703,128721,128722,128759,128760,129297,129309,129310,129312,129313,129314,129346,129354,129355,129360,
129361,129371,129380,129382,129384,129408,129412,129413,129414,129415,129416,129417,129418,129427,129472,129489]

export { fixedEth, copyToClipboard, showSendTransactionToasts, flags, addressToEmoji }
