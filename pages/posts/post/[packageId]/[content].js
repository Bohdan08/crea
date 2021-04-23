import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// mock data
import data from "../../data";

// style
import styles from "./post.module.scss";

const Post = () => {
  const router = useRouter();

  const [pollState, setPollState] = useState(false);

  console.log(router, "router.query");
  const { packageId, pollCompleted = false } = router.query;

  const contentInfo = data.find((obj) => obj.packageId === packageId);
  console.log(contentInfo, "contentInfo");

  // useEffect(() => {
  //   if (pollCompleted != pollState) {
  //     setPollState(pollCompleted);
  //   }
  // }, []);

  console.log(pollState, "pollState");
  return (
    <div>
      <div className="flex flex-row">
        <hr />

        <div className="w-2/12">
          <div className="flex flex-col">
            <div className="mt-24">
              <Link
                href={`/posts/post/[packageId]/${
                  pollState ? "content" : "poll"
                }`}
                as={`/posts/post/${packageId}/${
                  pollState ? "content" : "poll"
                }`}
              >
                <a
                  className={`w-36 text-center flex justify-center py-2 rounded-lg text-white text-xl fixed ${
                    pollState
                      ? "bg-purple-500 cursor-not-allowed hidden"
                      : "bg-purple-700 hover:bg-purple-800"
                  }`}
                >
                  <span> Poll </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 pt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </a>
              </Link>
            </div>
            <div className="mt-16">
              <Link
                href="/posts/post/[packageId]/debates"
                as={`/posts/post/${packageId}/debates`}
              >
                <a className="w-36 text-center flex justify-center py-2 bg-pink-700  hover:bg-pink-800 rounded-lg text-white text-xl fixed">
                  <span>Debates </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 pt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-8/12 m-auto">
          <pre className="text-xl mx-auto my-10 d-flex justify-center w-400px">
            <code className="d-flex justify-center">
              {contentInfo && contentInfo.text}
              {/* {`
[Congressional Bills 117th Congress]
[From the U.S. Government Publishing Office]
[S. Res. 99 Reported in Senate (RS)]


                                                        Calendar No. 19
117th CONGRESS
  1st Session
S. RES. 99

        Observing the 10th anniversary of the uprising in Syria.


_______________________________________________________________________


                   IN THE SENATE OF THE UNITED STATES

                             March 9, 2021

   Mr. Menendez (for himself, Mr. Risch, Mr. Cardin, Mr. Rubio, Mrs. 
 Shaheen, Mr. Johnson, Mr. Kaine, Mr. Romney, Mr. Murphy, Mr. Hagerty, 
 Mr. Coons, Mr. Crapo, Mr. Rounds, Mr. Booker, Mr. Tillis, Mr. Casey, 
    and Mr. Sullivan) submitted the following resolution; which was 
             referred to the Committee on Foreign Relations

                             March 24, 2021

              Reported by Mr. Menendez, without amendment

_______________________________________________________________________

                               RESOLUTION


 
        Observing the 10th anniversary of the uprising in Syria.

Whereas 10 years ago, on March 15, 2011, in the midst of the Arab Spring, 
        hundreds of Syrians peacefully assembled to call on their leadership for 
        democratic reforms and respect for their fundamental freedoms, sparking 
        a nationwide movement;
Whereas in response to the predominantly peaceful protests, Syrian President 
        Bashar al-Assad ordered unyielding violence against the people of Syria, 
        including arbitrary detentions, torture, killing, and attacks on 
        civilians and civilian infrastructure, often under the false premise of 
        combating terrorism;
Whereas over the course of this conflict, the Assad regime has exhibited 
        unrelenting depravity in its use of chemical weapons and barrel bombs, 
        deliberately targeting civilian infrastructure, including hospitals and 
        schools, and committing gross violations of international humanitarian 
        law;
Whereas the former Syrian military photographer Caesar'' meticulously 
        photographed the Assad regime's widespread system of arrest, detention, 
        torture and murder of tens of thousands of Syrian protesters and 
        dissidents, and then courageously smuggled 55,000 of those photographs 
        out of Syria, exposing the regime's barbarity for the world to witness;
Whereas the Caesar Syria Civilian Protection Act of 2019 (22 U.S.C. 8791 note), 
        which became law on December 20, 2019--

    (1) seeks accountability for the Assad regime and its international 
enablers for atrocities against the Syrian people;

    (2) denies the Assad regime the resources to fuel its war machine; and

    (3) sends a clear signal to the international community against 
normalizing, rehabilitating, or legitimizing Assad and his backers;

Whereas Iran and Russia intervened militarily in support of the Assad regime, 
        enabling and actively participating in the Assad regime's horrific 
        brutalities against civilians in favor of advancing their narrow 
        interests and in some cases empowered extremist groups;
Whereas in pursuit of its narrow self-interest, Russia, backed by China, has 
        blunted United Nations' efforts to preserve vital border crossings that 
        serve as a critical humanitarian lifeline to the beleaguered Syrian 
        population;
Whereas the Islamic State in Iraq and Syria exacerbated the suffering of the 
        Syrian people through the violent and hostile seizure of territory, 
        misapplication of Islamic law, destruction and smuggling of antiquities, 
        and oil smuggling, turning Syria into a global hub for terrorist 
        activity;
Whereas the Assad regime, and its Russian and Iranian backers, are largely 
        responsible for the death of more than 500,000 Syrian civilians, and the 
        displacement of more than 12,000,000 men, women, and children within and 
        outside of Syria's borders, imposing irreversible trauma and loss for a 
        whole generation;
Whereas millions of Syrians are struggling to survive, with more than 13,000,000 
        Syrians who are in need of humanitarian assistance and more than 
        9,000,000 Syrians who are facing food insecurity;
Whereas international efforts to secure a peaceful political transition of power 
        in Syria, in accordance with United Nations Security Council Resolution 
        2254, adopted on December 18, 2015, remain stymied, due almost entirely 
        to the intransigence of Russia and the Assad regime, holding the people 
        of Syria hostage;
Whereas the people and Government of the United States support the people of 
        Syria in their aspirations for peace, stability, dignity, and 
        accountability: Now, therefore, be it
    Resolved, That the Senate--
            (1) solemnly observes the 10th anniversary of the Syrian 
        uprising;
            (2) affirms that it is the policy of the United States--
                    (A) to seek a political solution to the Syrian 
                conflict;
                    (B) to continue to stand with the people of Syria;
                    (C) to further efforts to secure a permanent 
                ceasefire;
                    (D) to continue work on the constitutional 
                committee free from regime intransigence; and
                    (E) to foster conditions for free and fair 
                elections in accordance with United Nations Security 
                Council Resolution 2254;
            (3) affirms that it is the policy of the United States to 
        promote adherence to the laws of war by all parties engaging in 
        hostilities in Syria;
            (4) affirms that it is the policy of the United States to 
        support international humanitarian efforts to assist innocent 
        civilians, including through support for displaced populations 
        and the promotion of accountability for perpetrators of human 
        rights abuses;
            (5) commits to continuing efforts to hold the Assad regime 
        and its Russian and Iranian backers accountable for war crimes 
        and crimes against humanity; including through implementation 
        of the Caesar Syria Civilian Protection Act of 2019;
            (6) commends the bravery of Syrian human rights defenders 
        who, in the service of justice and accountability, have 
        courageously documented the atrocities committed by the Assad 
        regime and its Russian and Iranian backers over the course of 
        this conflict;
            (7) condemns the indiscriminate use of force by all actors 
        in Syria, including the Assad regime, its proponents, its 
        opponents, and extremist groups; and
            (8) calls on the United States Government to reinvigorate 
        diplomatic efforts to resolve the conflict as outlined under 
        United Nations Security Council Resolution 2254, and to expand 
        humanitarian aid to the Syrian people so they may--
                    (A) be free from violence, whether from the state 
                or other armed groups;
                    (B) return to their communities of their own free 
                will and in an informed manner;
                    (C) participate in transitional justice; and
                    (D) decide their own futures through free and fair 
                elections that result in a legitimate representative 
                government that serves all Syrians.




                                                        Calendar No. 19

117th CONGRESS

  1st Session

                               S. RES. 99

_______________________________________________________________________

                               RESOLUTION

        Observing the 10th anniversary of the uprising in Syria.

_______________________________________________________________________

                             March 24, 2021

                       Reported without amendment
`} */}
            </code>
          </pre>
        </div>
        <div className="w-2/12"></div>
      </div>
    </div>
  );
};

export default Post;
