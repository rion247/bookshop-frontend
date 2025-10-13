import Container from "../../components/Shared/Container";
import HeroForAbout from "./HeroForAbout";
import collectionImg from "../../assets/images/collection.png";
import loveImg from "../../assets/images/day.png";
import earthImg from "../../assets/images/earth.png";
import drivenImg from "../../assets/images/light-bulb.png";
import speechImg from "../../assets/images/speech-bubble.png";

const About = () => {
  return (
    <div>
      <HeroForAbout />
      <Container>
        <div className="my-6 md:my-8 lg:my-10 xl:my-12 font-poppins">
          <p className="text-xs md:text-sm lg:text-base text-neutral-500 text-justify">
            At eBookNest, we believe that books are more than just pages filled
            with words — they are portals to worlds unknown, voices from the
            past, and blueprints for the future. Our mission is to bring every
            reader closer to the joy of reading, learning, and self-discovery.
            Whether you are an avid reader, a student hungry for knowledge, or
            someone simply searching for inspiration, eBookNest is here to be
            your trusted reading companion. We created eBookNest with one simple
            vision: to make reading accessible, enjoyable, and meaningful for
            everyone. In a world filled with distractions, we aim to bring
            people back to what truly matters — the magic of stories, the thrill
            of imagination, and the endless curiosity that fuels the human
            spirit.
          </p>
        </div>
        <div className="my-6 md:my-8 lg:my-10 xl:my-12 font-poppins">
          <h4 className="text-lg lg:text-xl xl:text-2xl my-2 md:my-4 lg:my-6 font-semibold bg-blue-500 p-2 lg:p-4 rounded text-center text-white">
            Our Mission
          </h4>
          <p className="text-xs md:text-sm lg:text-base text-neutral-500 text-justify">
            At eBookNest, our mission is to inspire a culture of reading and
            learning. We want to make it easier for people to explore new ideas,
            expand their knowledge, and experience the transformative power of
            stories.
            <p>We aim to:</p>
            <ol className="list-disc p-6 md:p-8 lg:p-10 xl:p-12">
              <li>
                <span className="font-semibold">Empower Readers:</span> Help
                readers of all ages and backgrounds discover books that resonate
                with them.
              </li>
              <li>
                <span className="font-semibold">Support Authors:</span> Provide
                a fair and inspiring space for authors to share their creativity
                and connect with passionate audiences.
              </li>
              <li>
                <span className="font-semibold">Promote Learning:</span>
                Encourage curiosity, creativity, and lifelong learning through
                literature.
              </li>
              <li>
                <span className="font-semibold">Build Community:</span> Create a
                welcoming environment where readers and writers come together to
                share ideas and experiences.
              </li>
            </ol>
            <p>
              We believe that books are the most powerful tools of
              transformation — they can educate, entertain, and enlighten all at
              once. Through eBookNest, we are nurturing a new generation of
              thinkers and storytellers.
            </p>
          </p>
        </div>

        <div className="my-6 md:my-8 lg:my-10 xl:my-12 font-poppins">
          <h4 className="text-lg lg:text-xl xl:text-2xl my-2 md:my-4 lg:my-6 font-semibold bg-blue-500 p-2 lg:p-4 rounded text-center text-white">
            Why Choose eBookNest
          </h4>
          <p className="text-xs md:text-sm lg:text-base text-neutral-500 text-justify">
            There are thousands of book platforms out there — but eBookNest is
            more than just an online bookstore. It is a home for readers who
            seek meaning, not just material.
            <p>Here's what makes us different:</p>
            <ol className="my-6 md:my-8 lg:my-10 xl:my-12 flex flex-col gap-2 lg:gap-3 xl:gap-4">
              <li>
                <div className="flex justify-items-start items-center gap-x-2">
                  <img
                    className="w-4 h-4"
                    src={collectionImg}
                    alt="...Loading"
                  />
                  <h6 className="font-semibold">Curated Collections:</h6>
                </div>

                <p>
                  We handpick every book to ensure that each one carries value —
                  whether it is a classic novel, a self-help guide, or a
                  groundbreaking scientific discovery.
                </p>
              </li>
              <li>
                <div className="flex justify-items-start items-center gap-x-2">
                  <img className="w-4 h-4" src={speechImg} alt="...Loading" />
                  <h6 className="font-semibold">Reader-Focused Experience:</h6>
                </div>

                <p>
                  Our user-friendly interface helps you explore books
                  effortlessly, discover hidden gems, and enjoy smooth
                  navigation from start to finish.
                </p>
              </li>
              <li>
                <div className="flex justify-items-start items-center gap-x-2">
                  <img className="w-4 h-4" src={loveImg} alt="...Loading" />
                  <h6 className="font-semibold">Affordable and Accessible:</h6>
                </div>

                <p>
                  We believe reading should be for everyone — that’s why we
                  offer quality books at fair prices, with regular offers and
                  recommendations.
                </p>
              </li>
              <li>
                <div className="flex justify-items-start items-center gap-x-2">
                  <img className="w-4 h-4" src={earthImg} alt="...Loading" />
                  <h6 className="font-semibold">A Global Community:</h6>
                </div>

                <p>
                  From students and teachers to dreamers and creators — our
                  growing global community connects through the love of reading.
                </p>
              </li>
              <li>
                <div className="flex justify-items-start items-center gap-x-2">
                  <img className="w-4 h-4" src={drivenImg} alt="...Loading" />
                  <h6 className="font-semibold">Driven by Passion:</h6>
                </div>

                <p>
                  From students and teachers to dreamers and creators — our
                  growing global community connects through the love of reading.
                </p>
              </li>
            </ol>
            <p>
              We believe that books are the most powerful tools of
              transformation — they can educate, entertain, and enlighten all at
              once. Through eBookNest, we are nurturing a new generation of
              thinkers and storytellers.
            </p>
          </p>
        </div>

        <div className="my-6 md:my-8 lg:my-10 xl:my-12 font-poppins">
          <h4 className="text-lg lg:text-xl xl:text-2xl my-2 md:my-4 lg:my-6 font-semibold bg-blue-500 p-2 lg:p-4 rounded text-center text-white">
            Our Philosophy
          </h4>
          <p className="text-xs md:text-sm lg:text-base text-neutral-500 text-justify">
            At eBookNest, we believe that every book has a soul. It carries the
            dreams of its author, the emotions of its characters, and the
            reflections of its readers.
            <p>
              We see reading as an act of connection — between minds, across
              generations, beyond borders. A single book can open a door, spark
              an idea, or even change the course of a life.
            </p>
            <p>Our philosophy is built on three simple truths:</p>
            <ol className="list-decimal p-6 md:p-8 lg:p-10 xl:p-12">
              <li>
                <h6 className="font-semibold">Stories Shape Us:</h6>
                <p>The stories we read become a part of who we are.</p>
              </li>
              <li>
                <h6 className="font-semibold">Knowledge Empowers:</h6>
                <p>
                  Every page teaches something new — about the world, about
                  others, and about ourselves.
                </p>
              </li>
              <li>
                <h6 className="font-semibold">Reading Unites:</h6>
                <p>
                  Books bring people together, bridging differences through
                  empathy and understanding.
                </p>
              </li>
            </ol>
            <p>
              That's why eBookNest exists — to make sure everyone has a place to
              explore, learn, and grow through the written word.
            </p>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default About;
