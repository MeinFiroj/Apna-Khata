import {
  BookOpenText,
  CircleHelp,
  LifeBuoy,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const supportAreas = [
  {
    icon: CircleHelp,
    title: "Quick answers",
    detail: "Find help for everyday questions.",
  },
  {
    icon: BookOpenText,
    title: "Helpful guides",
    detail: "Get more from your passbook.",
  },
  {
    icon: MessageCircle,
    title: "Talk to us",
    detail: "Reach our team when you need a hand.",
  },
];

const Support = () => {
  return (
    <main className="w-full flex-1 bg-(--clr-bg-off) p-(--pad-phone) pb-(--footer-space) md:p-(--pad-desk) md:pb-(--pad-desk)">
      <div className="mx-auto max-w-6xl">
        <section className="grid items-center gap-8 py-8 sm:py-12 md:grid-cols-2 md:gap-12 md:py-16">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-(--clr-surface) px-3 py-1.5 text-sm font-medium text-(--clr-primary)">
              <Sparkles size={15} aria-hidden="true" />
              <span>Support is on its way</span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-(--clr-text-primary) sm:text-4xl md:text-5xl">
              A little help, right when you need it.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-(--clr-text-secondary) sm:text-lg">
              We’re putting together a better way to find answers and get
              support for your Apna Khata.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-(--clr-primary)">
              <span
                className="h-2 w-2 rounded-full bg-(--clr-pending)"
                aria-hidden="true"
              />
              Help center coming soon
            </p>
          </div>

          <div
            className="relative mx-auto flex aspect-1.25/1 w-full max-w-md items-center justify-center overflow-hidden rounded-xl bg-[#e6f0ff]"
            aria-hidden="true"
          >
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#c8dcff]" />
            <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-[#d5eadc]" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-(--clr-primary) text-white shadow-lg sm:h-36 sm:w-36">
              <LifeBuoy size={66} strokeWidth={1.5} />
            </div>
            <div className="absolute left-[12%] top-[19%] flex h-12 w-12 items-center justify-center rounded-xl bg-white text-(--clr-primary) shadow-md sm:h-14 sm:w-14">
              <MessageCircle size={25} strokeWidth={1.7} />
            </div>
            <div className="absolute bottom-[17%] right-[12%] flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff2cc] text-[#9b6200] shadow-md sm:h-14 sm:w-14">
              <CircleHelp size={25} strokeWidth={1.7} />
            </div>
            <span className="absolute right-[14%] top-[19%] h-3 w-3 rounded-full bg-[#e3913a]" />
            <span className="absolute bottom-[22%] left-[19%] h-2.5 w-2.5 rounded-full bg-(--clr-primary)" />
          </div>
        </section>

        <section className="border-t border-(--clr-border) py-6 sm:py-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--clr-text-muted)">
            What we’re working on
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {supportAreas.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-(--clr-primary) shadow-sm">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-(--clr-text-primary)">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-(--clr-text-secondary)">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Support;
