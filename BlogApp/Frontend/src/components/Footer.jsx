import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Logo } from './index'
import { BsInstagram, BsGithub } from 'react-icons/bs';
export default function FooterCom() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Logo />
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://github.com/CodeChat-WithHanzla/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href='/about'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Hanzla's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow us' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://www.instagram.com/codechatwithhanzla/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Instagram
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href='#' by="Hanzla's Blog" year={new Date().getFullYear()} />

                    <div className="flex gap-6 sm:mt-0 mt4 sm:justify-center mt-3">
                        <Footer.Icon href='https://www.instagram.com/codechatwithhanzla/' icon={BsInstagram} target='_blank'
                            rel='noopener noreferrer' />
                        <Footer.Icon href='https://github.com/CodeChat-WithHanzla' icon={BsGithub} target='_blank'
                            rel='noopener noreferrer' />
                    </div>
                </div>
            </div>
        </Footer>
    );
}