import BorderedContainer from "../common/BorderedContainer";
import { Card, CardContent } from "../ui/card";
import BackButton from "../common/BackButton";
import { CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const securityOptions = [
  { id: 1, name: "Biometric ID", value: false },
  { id: 2, name: "Face ID", value: false },
];

const securityOperations = [
  {
    id: 1,
    title: "Device Management",
    description: "Manage your account on the various devices you own.",
  },
  {
    id: 2,
    title: "Deactivate Account",
    description:
      "Temporarily deactivate your account. Easily reactivate when you're ready.",
  },
  {
    id: 3,
    title: "Delete Account",
    description:
      "Permanently remove your account and data from Tripmate. Proceed with caution.",
  },
];

export default function AccountSecurity({
  onDeleteAccount,
}: {
  onDeleteAccount: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <BackButton router="/profile" />
        <CardTitle className="text-center text-xl md:hidden block">
          Account & Security
        </CardTitle>
      </div>
      <BorderedContainer>
        <Card className="flex flex-col gap-3">
          <CardTitle className="text-center text-xl hidden md:block">
            Account & Security
          </CardTitle>
          <CardContent className="p-0">
            <div className="flex items-center flex-col gap-4">
              {securityOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between gap-4 w-full font-semibold text-xl"
                >
                  <span>{option.name}</span>
                  <Switch />
                </div>
              ))}
              {securityOperations.map((operation) => (
                <Card
                  key={operation.id}
                  className="flex items-center justify-between w-full border-none shadow-sm cursor-pointer md:p-4"
                >
                  <CardContent className="p-0">
                    {(operation.id === 1 || operation.id === 2) && (
                      <>
                        <p className="font-semibold text-xl mb-1">
                          {operation.title}
                        </p>
                        <p className="text-sm text-muted">
                          {operation.description}
                        </p>
                      </>
                    )}

                    {operation.id === 3 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <CardContent className="p-0 cursor-pointer">
                            <p className="font-semibold text-xl mb-1 text-red-500">
                              Delete Account
                            </p>
                            <p className="text-sm text-muted">
                              Permanently remove your account and data from
                              Tripmate. Proceed with caution.
                            </p>
                          </CardContent>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-black">
                              Are you sure you want to delete your account?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button
                                className="md:w-1/2 cursor-pointer"
                                type="button"
                                variant="outline"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              className="md:w-1/2 cursor-pointer"
                              type="button"
                              variant="destructive"
                              onClick={onDeleteAccount}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardContent>
                  <ChevronRight className="w-5 h-5 text-muted" />
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </BorderedContainer>
    </>
  );
}
