import Amplify, { Auth, Storage } from "aws-amplify";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchUserFromDbById } from "../redux/slices/userSlice";
import { setRegion } from "../redux/slices/regionSlice";

const CustomButton = ({ textValue, style, pathname }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <button
      className={`cursor bg-blue-500 text-white p-2 rounded w-56 ${style}`}
      onClick={() => {
        dispatch(setRegion(pathname));
        localStorage.setItem("region", pathname);
        router.push({ pathname: `/${pathname}/` });
      }}
    >
      {textValue}
    </button>
  );
};

const Home = ({ contentData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const userAuthValues = await Auth.currentAuthenticatedUser();

    // pull user's data from db and save it to redux
    if (userAuthValues?.attributes?.sub) {
      dispatch(fetchUserFromDbById(userAuthValues.attributes.sub));
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex p-12 h-72 bg-yellow-100">
        <div className="w-1/2 text-left m-auto">
          <p className="text-5xl font-light">
            Welcome to <b> WeLobby!</b>{" "}
          </p>
          <p className="pt-5 text-3xl">
            We make politics more open and accessible.
          </p>
          <div className="mt-5">
            {/* <button className="cursor bg-blue-500	text-white p-2 rounded w-24">
              United States of America
            </button> */}
            <CustomButton textValue="United States of America" pathname="usa" />
            <CustomButton
              textValue="United Kingdom"
              style="ml-5"
              pathname="uk"
            />
            {/* <button className="cursor bg-blue-500	text-white p-2 rounded">
              United Kingdom
            </button> */}
          </div>
        </div>
        <div className="w-1/2  m-auto">
          <p className="text-3xl text-right font-light w-96 float-right">
            Learn, discuss and vote for the upcoming legislation.
          </p>
        </div>
      </div>
      <div>
        <div className="mt-8 flex">
          <div className="pl-12 pr-12 pb-12 w-full">
            <div className="m-aut">
              <p className="text-3xl text-center pb-3">Our Vision/Mission</p>
              <p className="text-lg">
                {/* In a democracy the elected officials enact the will of the
                people. In other words we, the voters, collectively are the
                boss. However, it turns out that in our hugely complex and
                competitive political systems powered by market economy we are
                not the only boss. The obscure presence of another boss - the
                elites that donate money to politicians and political parties to
                fund their campaigns, makes the picture somewhat complicated.
                Elected officials have to serve both bosses by carefully
                balancing their appeal to the voters to get re-elected and to
                the elites in order to out-raise the competition. Evidently,
                such a system is prone to conflicts of interest. One may argue
                that we all have equal voting rights and if a politician is not
                doing a good job we will vote him/her out. The majority decides.
                But this is where things get a bit murky, the main difference
                between the two bosses - while voters act at elections with set
                time intervals, say every 4 years, the elites have real time
                access to decision making. For them this is all that is needed,
                oftentimes they do not care who wins as they can sponsor
                multiple candidates to get “access” to whoever is elected. It is
                fairly obvious that this crucial real time lobbying access tips
                the balance into the “other boss’s” favour. Lobbying in itself
                is not a bad thing, it helps lawmakers to make informed
                decisions by getting access to sponsored research and relevant
                data. They are way understaffed to develop the knowledge base
                independently. What is missing there is … us! We, voters, don’t
                have a seat at the table where and when this knowledge is shared
                and discussed. If we did, then perhaps that knowledge base could
                be even better and a fairer balance of interest could be
                maintained. So how can we fix this? For democracy to survive in
                today’s fast paced environment we need to take a more active
                role in real time decision making. Media alone is not a
                solution, although it helps keep officials accountable media
                business models make it harder and harder to see through the
                tsunami of opinions. We need to invest our time in learning,
                discussing, getting to the bottom of things and lobbying in real
                time in order to get our views across to our representatives.
                How can we do this? To try and fix this imbalance we created
                WeLobby, a resource to learn, discuss and vote for the upcoming
                legislation. This is the place where we organise our feedback
                and pull together our lobbying power. There is strength in
                numbers - individual letters to representatives are not very
                effective as they bounce off against the bureaucratic machine.
                But if enough voters express their view on a specific matter in
                an organised way it will be much harder to ignore. How do we
                organise this? By gathering and publishing data on voters'
                reaction and support on specific policy or issues we will allow
                the elected officials to see if their decision is likely to have
                voters backing. Is this similar to polling? We think that it is
                rather a step in a new direction that will make the results less
                biased and more trustworthy. We are not influenced by funders,
                do not “frame questions” and do not select who we ask those
                questions. More importantly, our data will be driven by you and
                this difference will produce a much more powerful and effective
                direction. You don’t need any expert knowledge to take part,
                anyone is welcome to join the discussion. Start by answering a
                few questions and take a seat at the table! */}
                {contentData}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let errorText = "";

  const result = await Storage.get(
    `${process.env.HOME_PAGE_CONTENT_TEXT_FILE_NAME}.txt`,
    {
      download: true,
    }
  ).catch((error) => (errorText = error.response.statusText));

  return {
    props: { contentData: result?.Body || errorText }, // will be passed to the page component as props
  };
}

export default Home;
