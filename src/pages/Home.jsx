import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Award, BookOpen, Code, Target} from 'lucide-react';
import {useUser} from "../context/LoginRequired.jsx";


export default function Home() {
    const user = useUser();

    return (
        <div className="min-h-screen bg-slate-50">
            <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 lg:mb-16">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                            Learn SQL Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Hands-On Practice</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Challenge yourself with interactive SQL exercises. From SELECT basics to complex queries, build real database skills with immediate and detailed feedback.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/dashboard/laboratories"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            {(!user || !user.userId) && <Link
                                to="/sign-in"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all border border-slate-300"
                            >
                                Sign In
                            </Link>}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-400">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold text-white mb-4">Everything you need to become proficient in SQL, organized and structured for maximum learning.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: BookOpen,
                                title: 'Structured Learning',
                                description: 'Organized exercises, learn progressively and build confidence.',
                            },
                            {
                                icon: Target,
                                title: 'Hands-On Practice',
                                description: 'Write real SQL queries and get immediate feedback. Learn by doing, not just watching.',
                            },
                            {
                                icon: Award,
                                title: 'Track Progress',
                                description: 'Monitor your learning journey. See statistics as you complete exercises.',
                            },
                            {
                                icon: Code,
                                title: 'Detailed feedback',
                                description: 'Every exercise comes with feedback to help you understand and improve.',
                            },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:bg-white border border-slate-200 hover:border-blue-200"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-slate-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Master SQL through carefully designed laboratories and exercises.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: 'SQL Fundamentals',
                                description: 'Master the basics of SQL queries. Learn SELECT, WHERE, and basic filtering.',
                                level: 'Beginner',
                                color: 'from-green-500 to-emerald-500',
                            },
                            {
                                title: 'Data Relationships',
                                description: 'Explore JOINs and understand how to work with multiple tables.',
                                level: 'Intermediate',
                                color: 'from-amber-500 to-orange-500',
                            },
                            {
                                title: 'Aggregate Functions',
                                description: 'Learn SUM, COUNT, AVG, and GROUP BY for data analysis.',
                                level: 'Intermediate',
                                color: 'from-amber-500 to-orange-500',
                            },
                            {
                                title: 'Advanced Queries',
                                description: 'Dive into subqueries, and complex aggregations.',
                                level: 'Advanced',
                                color: 'from-red-500 to-pink-500',
                            },
                        ].map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-all hover:border-slate-300"
                            >
                                <div className={`h-2 w-16 bg-gradient-to-r ${course.color} rounded-full mb-4`}></div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                                <p className="text-slate-600 mb-4">{course.description}</p>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                    course.level === 'Beginner'
                                        ? 'bg-green-100 text-green-700'
                                        : course.level === 'Intermediate'
                                            ? 'bg-amber-100 text-amber-700'
                                            : 'bg-red-100 text-red-700'
                                }`}>
                                    {course.level}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-400">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">How It Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                step: '01',
                                title: 'Sign Up',
                                description: 'Create your account and join the other students to learn SQL.',
                            },
                            {
                                step: '02',
                                title: 'Choose a Lab',
                                description: 'Browse the organized laboratories and select one to start learning.',
                            },
                            {
                                step: '03',
                                title: 'Practice Exercises',
                                description: 'Write SQL queries and get instant feedback on your solutions.',
                            },
                            {
                                step: '04',
                                title: 'Learn & Grow',
                                description: 'Review the solutions and progress through the challenges.',
                            },
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 h-full">
                                    <div className="text-5xl font-bold text-blue-200 mb-4">{item.step}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.description}</p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden md:flex absolute top-1/2 -right-3 w-6 h-6 bg-blue-600 rounded-full items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-slate-900 text-slate-400 py-4 px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-slate-700 pt-8">
                        <p className="text-center text-sm">
                            © 2025 SQLLearner
                        </p>
                    </div>
            </footer>
        </div>
    );
}
