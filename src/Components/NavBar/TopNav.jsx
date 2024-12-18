import './NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkMode';

const NavBar = () => {
    return (
        <nav>
            <Link to="/"><svg width="112" height="30" viewBox="0 0 112 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.293 4L12.6387 4.03711C12.6387 4.03711 13.3233 4.16688 13.8203 5.04688L16.6074 9.98438L14.7305 11.0469L21.1875 11.9922L23.5742 6.05078L21.832 7.0332L20.5723 4.80273C20.3233 4.36273 19.906 4.028 19.293 4ZM10.1621 5.00391C9.29923 4.93928 8.30659 5.22569 7.55859 6.24219L7.47461 6.33594L6.66797 7.67578L11.8184 10.7148L13.3125 8.24414L11.9863 5.86914C11.7578 5.48314 11.025 5.06853 10.1621 5.00391ZM9.07227 11.3125L2.74219 12.2773L4.47461 13.2773L3.19336 15.4961C2.94036 15.9341 2.86534 16.4658 3.15234 17.0078L6.56641 22.7188C6.56641 22.7188 6.33094 22.0625 6.83594 21.1875L9.66992 16.2773L11.5391 17.3555L9.07227 11.3125ZM25.5352 11.8887L20.5801 14.7578L22.4355 17.998H24.8555C25.7515 17.979 27.744 16.2629 26.709 13.9609L26.6699 13.8418L25.5352 11.8887ZM19 17.8438L15 23L19 28V26H21.5625C22.0685 26 22.5656 25.8002 22.8906 25.2812L26.1309 19.4688C26.1309 19.4688 25.6809 20 24.6699 20H19V17.8438ZM9.8457 20L8.47461 22.3496C8.04161 23.1356 8.53588 25.7196 11.0469 25.9746L11.168 26L13 25.9805V20H9.8457Z" fill="white"/>
<path d="M45.4375 10.6307C45.3466 9.82386 44.9716 9.19886 44.3125 8.75568C43.6534 8.30682 42.8239 8.08239 41.8239 8.08239C41.108 8.08239 40.4886 8.19602 39.9659 8.42329C39.4432 8.64489 39.0369 8.9517 38.7472 9.34375C38.4631 9.73011 38.321 10.1705 38.321 10.6648C38.321 11.0795 38.4176 11.4375 38.6108 11.7386C38.8097 12.0398 39.0682 12.2926 39.3864 12.4972C39.7102 12.696 40.0568 12.8636 40.4261 13C40.7955 13.1307 41.1506 13.2386 41.4915 13.3239L43.196 13.767C43.7528 13.9034 44.3239 14.0881 44.9091 14.321C45.4943 14.554 46.0369 14.8608 46.5369 15.2415C47.0369 15.6222 47.4403 16.0938 47.7472 16.6562C48.0597 17.2188 48.2159 17.892 48.2159 18.6761C48.2159 19.6648 47.9602 20.5426 47.4489 21.3097C46.9432 22.0767 46.2074 22.6818 45.2415 23.125C44.2813 23.5682 43.1193 23.7898 41.7557 23.7898C40.4489 23.7898 39.3182 23.5824 38.3636 23.1676C37.4091 22.7528 36.6619 22.1648 36.1222 21.4034C35.5824 20.6364 35.2841 19.7273 35.2273 18.6761H37.8693C37.9205 19.3068 38.125 19.8324 38.483 20.2528C38.8466 20.6676 39.3097 20.9773 39.8722 21.1818C40.4403 21.3807 41.0625 21.4801 41.7386 21.4801C42.483 21.4801 43.1449 21.3636 43.7244 21.1307C44.3097 20.892 44.7699 20.5625 45.1051 20.142C45.4403 19.7159 45.608 19.2187 45.608 18.6506C45.608 18.1335 45.4602 17.7102 45.1648 17.3807C44.875 17.0511 44.4801 16.7784 43.9801 16.5625C43.4858 16.3466 42.9261 16.1562 42.3011 15.9915L40.2386 15.429C38.8409 15.0483 37.733 14.4886 36.9148 13.75C36.1023 13.0114 35.696 12.0341 35.696 10.8182C35.696 9.8125 35.9688 8.93466 36.5142 8.18466C37.0597 7.43466 37.7983 6.85227 38.7301 6.4375C39.6619 6.01705 40.7131 5.80682 41.8835 5.80682C43.0653 5.80682 44.108 6.0142 45.0114 6.42898C45.9205 6.84375 46.6364 7.41477 47.1591 8.14204C47.6818 8.86364 47.9545 9.69318 47.9773 10.6307H45.4375ZM56.6726 23.7642C55.4453 23.7642 54.3743 23.483 53.4595 22.9205C52.5447 22.358 51.8345 21.571 51.3288 20.5597C50.8232 19.5483 50.5703 18.3665 50.5703 17.0142C50.5703 15.6562 50.8232 14.4687 51.3288 13.4517C51.8345 12.4347 52.5447 11.6449 53.4595 11.0824C54.3743 10.5199 55.4453 10.2386 56.6726 10.2386C57.8999 10.2386 58.9709 10.5199 59.8857 11.0824C60.8004 11.6449 61.5107 12.4347 62.0163 13.4517C62.522 14.4687 62.7749 15.6562 62.7749 17.0142C62.7749 18.3665 62.522 19.5483 62.0163 20.5597C61.5107 21.571 60.8004 22.358 59.8857 22.9205C58.9709 23.483 57.8999 23.7642 56.6726 23.7642ZM56.6811 21.625C57.4766 21.625 58.1357 21.4148 58.6584 20.9943C59.1811 20.5739 59.5675 20.0142 59.8175 19.3153C60.0732 18.6165 60.201 17.8466 60.201 17.0057C60.201 16.1705 60.0732 15.4034 59.8175 14.7045C59.5675 14 59.1811 13.4347 58.6584 13.0085C58.1357 12.5824 57.4766 12.3693 56.6811 12.3693C55.88 12.3693 55.2152 12.5824 54.6868 13.0085C54.1641 13.4347 53.7749 14 53.5192 14.7045C53.2692 15.4034 53.1442 16.1705 53.1442 17.0057C53.1442 17.8466 53.2692 18.6165 53.5192 19.3153C53.7749 20.0142 54.1641 20.5739 54.6868 20.9943C55.2152 21.4148 55.88 21.625 56.6811 21.625ZM65.6193 23.5V10.4091H68.0824V12.4886H68.2188C68.4574 11.7841 68.8778 11.2301 69.4801 10.8267C70.0881 10.4176 70.7756 10.2131 71.5426 10.2131C71.7017 10.2131 71.8892 10.2187 72.1051 10.2301C72.3267 10.2415 72.5 10.2557 72.625 10.2727V12.7102C72.5227 12.6818 72.3409 12.6506 72.0795 12.6165C71.8182 12.5767 71.5568 12.5568 71.2955 12.5568C70.6932 12.5568 70.1563 12.6847 69.6847 12.9403C69.2188 13.1903 68.8494 13.5398 68.5767 13.9886C68.304 14.4318 68.1676 14.9375 68.1676 15.5057V23.5H65.6193ZM81.7145 10.4091V12.4545H74.5639V10.4091H81.7145ZM76.4815 7.27273H79.0298V19.6562C79.0298 20.1506 79.1037 20.5227 79.2514 20.7727C79.3991 21.017 79.5895 21.1847 79.8224 21.2756C80.0611 21.3608 80.3196 21.4034 80.598 21.4034C80.8026 21.4034 80.9815 21.3892 81.1349 21.3608C81.2884 21.3324 81.4077 21.3097 81.4929 21.2926L81.9531 23.3977C81.8054 23.4545 81.5952 23.5114 81.3224 23.5682C81.0497 23.6307 80.7088 23.6648 80.2997 23.6705C79.6293 23.6818 79.0043 23.5625 78.4247 23.3125C77.8452 23.0625 77.3764 22.6761 77.0185 22.1534C76.6605 21.6307 76.4815 20.9744 76.4815 20.1847V7.27273ZM84.5334 23.5V10.4091H87.0817V23.5H84.5334ZM85.8203 8.3892C85.3771 8.3892 84.9964 8.24148 84.6783 7.94602C84.3658 7.64489 84.2095 7.28693 84.2095 6.87216C84.2095 6.4517 84.3658 6.09375 84.6783 5.79829C84.9964 5.49716 85.3771 5.34659 85.8203 5.34659C86.2635 5.34659 86.6413 5.49716 86.9538 5.79829C87.272 6.09375 87.4311 6.4517 87.4311 6.87216C87.4311 7.28693 87.272 7.64489 86.9538 7.94602C86.6413 8.24148 86.2635 8.3892 85.8203 8.3892ZM96.7401 10.4091V12.4545H89.3423V10.4091H96.7401ZM91.3707 23.5V8.89204C91.3707 8.07386 91.5497 7.39489 91.9077 6.85511C92.2656 6.30966 92.7401 5.90341 93.331 5.63636C93.9219 5.36364 94.5639 5.22727 95.2571 5.22727C95.7685 5.22727 96.206 5.26989 96.5696 5.35511C96.9332 5.43466 97.2031 5.50852 97.3793 5.5767L96.7827 7.6392C96.6634 7.60511 96.5099 7.56534 96.3224 7.51989C96.1349 7.46875 95.9077 7.44318 95.6406 7.44318C95.0213 7.44318 94.5781 7.59659 94.3111 7.90341C94.0497 8.21023 93.919 8.65341 93.919 9.23295V23.5H91.3707ZM100.98 28.4091C100.599 28.4091 100.253 28.3778 99.9403 28.3153C99.6278 28.2585 99.3949 28.196 99.2415 28.1278L99.8551 26.0398C100.321 26.1648 100.736 26.2188 101.099 26.2017C101.463 26.1847 101.784 26.0483 102.062 25.7926C102.347 25.5369 102.597 25.1193 102.812 24.5398L103.128 23.6705L98.3381 10.4091H101.065L104.381 20.5682H104.517L107.832 10.4091H110.568L105.173 25.2472C104.923 25.929 104.605 26.5057 104.219 26.9773C103.832 27.4545 103.372 27.8125 102.838 28.0511C102.304 28.2898 101.685 28.4091 100.98 28.4091Z" fill="white"/>
</svg>
</Link>
            <DarkModeToggle />
        </nav>
    );
};

export default NavBar;
