import { FaCodepen, FaDev, FaFacebook, FaFreeCodeCamp, FaGitlab, FaHashnode, FaLinkedin, FaStackOverflow, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa6";
import { SiCodewars, SiFrontendmentor } from "react-icons/si";
import { TbBrandGithub, TbBrandGithubFilled } from "react-icons/tb";

export const platformConfig = {
    github: {
        name: 'Github',
        color: '#191919',
        icon: TbBrandGithubFilled,
    },
    frontendMentor: {
        name: 'Frontend Mentor',
        color: '#ffffff',
        icon: SiFrontendmentor,
    },
    twitter: {
        name: 'Twitter',
        color: '#43b7e9',
        icon: FaTwitter,
    },
    linkedIn: {
        name: 'LinkedIn',
        color: '#2d68ff',
        icon: FaLinkedin,
    },
    youtube: {
        name: 'YouTube',
        color: '#ee3939',
        icon: FaYoutube,
    },
    facebook: {
        name: 'Facebook',
        color: '#2442ac',
        icon: FaFacebook,
    },
    twitch: {
        name: 'Twitch',
        color: '#ee3fc8',
        icon: FaTwitch,
    },
    dev_to: {
        name: 'Dev.to',
        color: '#333333',
        icon: FaDev,
    },
    codewars: {
        name: 'CodeWars',
        color: '#8a1a50',
        icon: SiCodewars,
    },
    codepen: {
        name: 'Codepen',
        color: '#32cd32',
        icon: FaCodepen,
    },
    freeCodeCamp: {
        name: 'freeCodeCamp',
        color: '#302267',
        icon: FaFreeCodeCamp,
    },
    gitLab: {
        name: 'GitLab',
        color: '#eb4925',
        icon: FaGitlab,
    },
    hashnode: {
        name: 'Hashnode',
        color: '#0330d1',
        icon: FaHashnode,
    },
    stackOverflow: {
        name: 'Stack Overflow',
        color: '#ec7100',
        icon: FaStackOverflow,
    },
}