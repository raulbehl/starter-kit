import Link from 'next/link';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';

export const Footer = () => {
	const { publication } = useAppContext();
	const domain = 'https://quicksilicon.in';
	const PUBLICATION_LOGO = publication.preferences.logo;
	return (
		<footer className="border-t py-20 dark:border-neutral-800 bg-[#1c1c1c]">
			<Container className="px-5">
				{PUBLICATION_LOGO ? (
					<div className="mb-20 flex w-full flex-row justify-center">
						<Link
							href={'/'}
							aria-label={`${publication.title} home page`}
							className="flex flex-row items-center gap-5"
						>
							<img className="block w-20" src={PUBLICATION_LOGO} alt={publication.title} />
						</Link>
					</div>
				) : (
					<p className="mb-20 text-center text-xl font-semibold text-slate-900 dark:text-slate-50 md:text-4xl">
						{publication.title}
					</p>
				)}
				<div className="grid w-full grid-cols-3 gap-5 md:grid-cols-6 lg:grid-cols-5">
					<div className="col-span-1 grid grid-cols-4 gap-5 md:col-span-4 lg:col-span-3">
						<div className="col-span-full md:col-span-2 lg:col-span-1">
							<p className="mb-2 font-black text-white dark:text-neutral-200">
								About
							</p>
							<ul className="flex flex-col gap-1 text-white dark:text-neutral-300">
								<li>
									<a href={domain + '/legal'} className="hover:underline" target='_blank'>
										Legal
									</a>
								</li>
								<li>
									<a href={domain + '/referral'} className="hover:underline" target='_blank'>
										Referral Policy
									</a>
								</li>
								<li>
									<a href={domain + '/privacy'} className="hover:underline" target='_blank'>
										Privacy
									</a>
								</li>
								<li>
									<a href="mailto:info@quicksilicon.in" className="hover:underline" target='_blank'>
										Contact Us
									</a>
								</li>
								<li>
									<a href={domain + '/refund'} className="hover:underline" target='_blank'>
										Cancellation and Refund
									</a>
								</li>
							</ul>
						</div>
						<div className="col-span-full md:col-span-2 lg:col-span-1">
							<p className="mb-2 font-black text-white dark:text-neutral-200">Reach us at</p>
							<ul className="flex flex-col gap-1 text-white dark:text-neutral-300">
								<li>
									<a href="https://www.linkedin.com/company/quicksilicon" className="hover:underline" target='_blank'>
										LinkedIn
									</a>
								</li>
								<li>
									<a href="https://www.instagram.com/quicksilicon" className="hover:underline" target='_blank'>
										Instagram
									</a>
								</li>
								<li>
									<a href="https://twitter.com/quicksilicon" className="hover:underline" target='_blank'>
										Twitter
									</a>
								</li>
								<li>
									<a href="https://www.facebook.com/quicksilicon" className="hover:underline" target='_blank'>
										Facebook
									</a>
								</li>
								<li>
									<a href="mailto:info@quicksilicon.in" className="hover:underline" target='_blank'>
										Gmail
									</a>
								</li>
							</ul>
						</div>
						<div className="col-span-full md:col-span-2 lg:col-span-2">
							<p className="mb-2 font-black text-white dark:text-neutral-200">QuickSilicon</p>
							<ul className="flex flex-col gap-1 text-white dark:text-neutral-300">
								<li>
									<address>
										<u>Registered Office</u>
										<br/>Shop No. 56 Block P NIT 5 Faridabad, Haryana - 121001
										<br/>CIN: U72900HR2021PTC094537
										<br/>Email Id: info@quicksilicon.in
										<br/>Telephone No: +91-9923278283
									</address>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
};
