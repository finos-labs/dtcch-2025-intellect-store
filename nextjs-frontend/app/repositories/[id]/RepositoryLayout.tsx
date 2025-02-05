"use client";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import SimpleChat from "./simpleChat";
import { DeleteButton } from "../deleteButton";
import { ReadRepositoryResponse } from "@/app/openapi-client";

// Utility function for conditional class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface RepositoryProfileProps {
  repository: ReadRepositoryResponse;
}

export default function RepositoryProfile({ repository }: RepositoryProfileProps) {
  const timeline = [
    {
      id: 1,
      type: { icon: PaperClipIcon, bgColorClass: "bg-gray-400" },
      content: "Initial commit",
      target: "Project scaffold created",
      date: "Jan 15",
      datetime: "2025-01-15",
    },
    {
      id: 2,
      type: { icon: PaperClipIcon, bgColorClass: "bg-blue-500" },
      content: "Merged pull request",
      target: "#42: Add authentication module",
      date: "Feb 1",
      datetime: "2025-02-01",
    },
    {
      id: 3,
      type: { icon: PaperClipIcon, bgColorClass: "bg-green-500" },
      content: "Released version",
      target: "v1.0.0",
      date: "Feb 5",
      datetime: "2025-02-05",
    },
  ];

  const complianceWarnings = [
    {
      id: 1,
      severity: "High",
      message: "Vulnerability in dependency XYZ, please update immediately.",
    },
    {
      id: 2,
      severity: "Medium",
      message: "License mismatch detected in module ABC.",
    },
    {
      id: 3,
      severity: "Low",
      message: "Code style warning: inconsistent indentations in file utils.js.",
    },
  ];

  return (
    <>
      {/* Top Navigation & Breadcrumbs */}
      <div className="min-h-full bg-gray-100">
        {/* Repository Header */}
        <div className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{repository.name}</h1>
                <div className="mt-2 flex flex-col sm:flex-row sm:space-x-8 text-sm text-gray-600">
                  {repository.description && (
                    <span className="mt-2 flex items-center">
                      {repository.description}
                    </span>
                  )}
                  {repository.last_updated && (
                    <span className="mt-2 flex items-center">
                      Last updated on {new Date(repository.last_updated).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex space-x-3">
                {repository.pull_request_link && (
                  <>
                    <button
                      onClick={() => window.open(repository.pull_request_link!, "_blank")}
                      className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      New Adaptation Pull Request
                    </button>
                  </>
                )}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex items-center rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Delete Repository
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item as={Fragment}>
                        {({ active }) => (
                          <DeleteButton repositoryId={repository.id}/>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Repository Information Card */}
                <section aria-labelledby="repository-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="repository-information-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Repository Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        General repository details.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Owner</dt>
                          <dd className="mt-1 text-sm text-gray-900">Justin Strnatko</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">License</dt>
                          <dd className="mt-1 text-sm text-gray-900">MIT</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {repository.last_updated
                              ? new Date(repository.last_updated).toLocaleDateString()
                              : "N/A"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Technical Owner</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            Matthias Van der Donck
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Business Owner</dt>
                          <dd className="mt-1 text-sm text-gray-900">Hanna Zubko</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <Link legacyBehavior href="#">
                        <a className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg">
                          View detailed statistics
                        </a>
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Compliance Warnings Card */}
                <section aria-labelledby="compliance-warnings-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="divide-y divide-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <h2
                          id="compliance-warnings-title"
                          className="text-lg font-medium text-gray-900"
                        >
                          Compliance Warnings
                        </h2>
                      </div>
                      <div className="px-4 py-6 sm:px-6">
                        {complianceWarnings.length > 0 ? (
                          <ul role="list" className="space-y-4">
                            {complianceWarnings.map((warning) => (
                              <li key={warning.id} className="bg-red-50 p-4 rounded-md">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium text-red-700">
                                    {warning.severity} Severity
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-red-600">{warning.message}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No compliance warnings.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Timeline Card */}
                <section aria-labelledby="timeline-title">
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                      Repository Timeline
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul role="list" className="-mb-8">
                        {timeline.map((item, itemIdx) => (
                          <li key={item.id}>
                            <div className="relative pb-8">
                              {itemIdx !== timeline.length - 1 && (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              )}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      item.type.bgColorClass,
                                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                    )}
                                  >
                                    <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {item.content}{" "}
                                      <a href="#" className="font-medium text-gray-900">
                                        {item.target}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                    <time dateTime={item.datetime}>{item.date}</time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex flex-col">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Create New Warning
                      </button>
                    </div>
                  </div>
                </section>

                {/* Chat Support Card */}
                <section aria-labelledby="chat-section-title">
                  <div className="bg-white shadow rounded-lg h-120px p-4 sm:p-6">
                    <h2 id="chat-section-title" className="text-lg font-medium text-gray-900 mb-4">
                      Ask Conformix
                    </h2>
                    <SimpleChat />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}